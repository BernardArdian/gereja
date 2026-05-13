function ValidateDataMember(data) {
  const requiredFields = [
    "nama",
    "stasi",
    "birth_place",
    "birth_date",
    "riwayat",
    "gender",
    "status"
  ];
  for (const field of requiredFields) {
     const value = data[field];

    if (field === "birth_date") {
      if (!value || isNaN(new Date(value))) {
        throw Object.assign(new Error(`Field ${field} harus berupa tanggal yang valid.`), {
          statusCode: 400,
        });
      }
    } else {
      if (typeof value !== "string" || !value.trim()) {
        throw Object.assign(new Error(`Field ${field} harus diisi.`), {
          statusCode: 400,
        });
      }
    }
  }

  // Optional fields: validasi hanya jika ada isinya
  const optionalStringFields = ["baptise_place", "status", "partner_name"];
  for (const field of optionalStringFields) {
    if (data[field] && (typeof data[field] !== "string" || !data[field].trim())) {
      throw Object.assign(new Error(`Field ${field} harus berupa string tidak kosong jika diisi.`), {
        statusCode: 400,
      });
    }
  }

  const optionalDateFields = ["baptise_date", "married_date"];
  for (const field of optionalDateFields) {
    if (data[field] && isNaN(new Date(data[field]))) {
      throw Object.assign(new Error(`Field ${field} harus berupa tanggal valid jika diisi.`), {
        statusCode: 400,
      });
    }
  }
}

module.exports = ValidateDataMember