// Status yang diterima menentukan apakah data berbentuk individu atau keluarga.
const allowedMaritalStatuses = new Set([
  "belum menikah",
  "sudah menikah",
  "duda",
  "janda",
]);

function fail(message) {
  // Samakan bentuk error validasi agar route dapat mengirim status 400.
  throw Object.assign(new Error(message), { statusCode: 400 });
}

function validatePerson(person, label) {
  // Setiap anggota wajib memiliki nama dan bentuk data sakramen yang konsisten.
  if (
    !person ||
    typeof person !== "object" ||
    typeof person.nama !== "string" ||
    !person.nama.trim()
  ) {
    fail(`Nama ${label} harus diisi.`);
  }

  for (const key of ["baptis", "komuni", "krisma"]) {
    const sacraments = person[key] ?? [];
    if (
      !Array.isArray(sacraments) ||
      sacraments.some(
        (item) =>
          !item ||
          item.status !== "sudah" ||
          typeof item.tempat !== "string" ||
          typeof item.tanggal !== "string" ||
          typeof item.stasi !== "string",
      )
    ) {
      fail(`Data sakramen ${label} tidak valid.`);
    }
  }
}

function ValidateDataMember(data) {
  // Validasi bentuk dasar dan stasi dilakukan sebelum membedakan tipe umat.
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    fail("Data umat tidak valid.");
  }

  if (!allowedMaritalStatuses.has(data.statusNikah)) {
    fail("Status pernikahan tidak valid.");
  }

  const stasiKeluarga =
    typeof data.stasiKeluarga === "string"
      ? data.stasiKeluarga
      : data.stasiKeluarga?.nama_stasi || data.stasiKeluarga?.nama || "";
  if (typeof stasiKeluarga !== "string" || !stasiKeluarga.trim()) {
    fail("Stasi keluarga harus diisi.");
  }

  if (data.statusNikah === "belum menikah") {
    // Data individu memakai objek single dan tidak boleh menyertakan keluarga.
    validatePerson(data.single, "umat");
    if (data.keluarga) {
      fail("Data individu tidak boleh berisi data keluarga.");
    }
    return;
  }

  if (data.noKk && typeof data.noKk !== "string") {
    fail("Nomor kartu keluarga tidak valid.");
  }
  if (!data.noKk?.trim()) {
    fail("Nomor kartu keluarga harus diisi untuk data keluarga.");
  }

  // Status menikah memerlukan nomor KK, data pasangan, dan daftar anak.
  const family = data.keluarga;
  if (!family || typeof family !== "object") {
    fail("Data suami dan istri harus diisi.");
  }
  validatePerson(
    { nama: family.namaSuami, ...(family.statusSakramentSuami || {}) },
    "suami",
  );
  validatePerson(
    { nama: family.namaIstri, ...(family.statusSakramentIstri || {}) },
    "istri",
  );

  const children = family.anak ?? [];
  if (!Array.isArray(children)) {
    fail("Data anak tidak valid.");
  }
  children.forEach((child, index) =>
    validatePerson(child, `anak ke-${index + 1}`),
  );
}

module.exports = ValidateDataMember;
