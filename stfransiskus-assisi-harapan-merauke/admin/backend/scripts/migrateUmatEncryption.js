require("dotenv").config();

const mongoose = require("mongoose");
const Umat = require("../model/member/umat");
const {
  assertDataEncryptionKey,
  getNoKkIndex,
  prepareMemberData,
  restoreMemberData,
} = require("../security/dataEncryption");

async function migrateUmatEncryption() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI belum dikonfigurasi.");
  }
  assertDataEncryptionKey();
  await mongoose.connect(process.env.MONGO_URI);

  const collection = Umat.collection;
  const seenNoKkHashes = new Set();

  // Periksa duplikasi terlebih dahulu agar migrasi tidak berhenti setelah write.
  for await (const document of collection.find(
    {},
    { projection: { noKk: 1 } },
  )) {
    const member = restoreMemberData(document);
    if (!member.noKk?.trim()) continue;

    const hash = getNoKkIndex(member.noKk);
    if (seenNoKkHashes.has(hash)) {
      throw new Error(
        "Nomor KK duplikat ditemukan; tidak ada data yang dimigrasikan.",
      );
    }
    seenNoKkHashes.add(hash);
  }

  let migratedCount = 0;
  for await (const document of collection.find({})) {
    const member = restoreMemberData(document);
    const protectedMember = prepareMemberData(member);
    await collection.replaceOne({ _id: document._id }, protectedMember);
    migratedCount += 1;
  }

  await collection.createIndex(
    { noKkHash: 1 },
    { name: "noKkHash_1", unique: true, sparse: true },
  );

  const indexes = await collection.indexes();
  const legacyNoKkIndexes = indexes.filter(
    (index) => index.name !== "_id_" && index.key?.noKk === 1,
  );
  for (const index of legacyNoKkIndexes) {
    await collection.dropIndex(index.name);
  }

  await mongoose.connection
    .collection("security_migrations")
    .updateOne(
      { _id: "umat-aes-gcm-v1" },
      { $set: { version: 1, completedAt: new Date() } },
      { upsert: true },
    );

  console.log(`Migrasi enkripsi umat selesai: ${migratedCount} dokumen.`);
}

migrateUmatEncryption()
  .catch((error) => {
    console.error(`Migrasi enkripsi umat gagal: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
