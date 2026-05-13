const Homili = require("../../model/katekese/renungan/homili");
const validateHomiliFields = require("../../helper/validateHomiliFields");

class homiliService {
  static async inputHomili(data) {
    try {
      validateHomiliFields(data);
      const sanitizedId = data.id?.trim() || `HOM-${Date.now()}`;

      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value != null && value !== ""
        )
      );
      if (typeof data.tema !== "string") {
        throw Object.assign(new Error("Tema harus berupa string"), {
          statusCode: 400,
        });
      }
      return new Homili({
        ...cleanedData,
        id: sanitizedId,
        tema: data.tema.trim(),
      }).save();
    } catch (error) {
      if (error.code === 11000) {
        throw Object.assign(new Error("Data sudah ada (duplikat)."), {
          statusCode: 409,
        });
      }
      throw Object.assign(new Error(`Terjadi kesalahan : ${error.message}`), {
        statusCode: 500,
      });
    }
  }
  static async getHomili(data) {
    try {
      const query = {};
      if (data.id) {
        query.id = data.id;
      }
      if (data.tema) {
        query.tema = new RegExp(data.tema, "i");
      }
      const homilis = await Homili.find(query);
      return homilis;
    } catch (error) {
      throw Object.assign(
        new Error(`Gagal mengambil data homili: ${error.message}`),
        {
          statusCode: 500,
        }
      );
    }
  }
  static async updateHomili(id, data) {
    try {
      // Validate ID
      if (!id || typeof id !== "string" || id.trim() === "") {
        throw Object.assign(new Error("ID homili tidak valid"), {
          statusCode: 400,
        });
      }

      const sanitizedId = id.trim();

      // Validate data
      if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
        throw Object.assign(
          new Error("Data pembaruan tidak valid atau kosong"),
          { statusCode: 400 }
        );
      }

      // Define allowed fields to prevent unwanted updates
      const allowedFields = ["title", "content", "author", "date", "category"]; // Adjust based on schema
      const cleanedData = Object.fromEntries(
        Object.entries(data)
          .filter(
            ([key, value]) =>
              allowedFields.includes(key) &&
              value != null &&
              value !== "" &&
              typeof value !== "undefined"
          )
          .map(([key, value]) => [
            key,
            typeof value === "string" ? value.trim() : value,
          ])
      );

      // Check if there's anything to update
      if (Object.keys(cleanedData).length === 0) {
        throw Object.assign(
          new Error("Tidak ada data valid untuk diperbarui"),
          { statusCode: 400 }
        );
      }

      // Update document
      const updatedHomili = await Homili.findOneAndUpdate(
        { _id: sanitizedId }, // Assuming MongoDB ObjectId; adjust if using custom 'id' field
        { $set: cleanedData },
        {
          new: true,
          runValidators: true, // Ensure schema validators are applied
          select: "-__v", // Exclude version key from response
        }
      );

      // Check if document was found
      if (!updatedHomili) {
        throw Object.assign(new Error("Homili tidak ditemukan"), {
          statusCode: 404,
        });
      }

      return updatedHomili;
    } catch (error) {
      // Log error for debugging (in production, use a proper logging library)
      console.error(`Error updating homili (ID: ${id}):`, error);

      // Re-throw error with appropriate status code
      throw Object.assign(
        new Error(`Gagal memperbarui homili: ${error.message}`),
        { statusCode: error.statusCode || 500 }
      );
    }
  }
  static async deleteHomili(id) {
    try {
      const sanitizedId = id.trim();
      const deletedHomili = await Homili.findOneAndDelete({ id: sanitizedId });
      if (!deletedHomili) {
        throw Object.assign(new Error("Homili tidak ditemukan"), {
          statusCode: 404,
        });
      }
      return deletedHomili;
    } catch (error) {
      throw Object.assign(
        new Error(`Gagal menghapus homili: ${error.message}`),
        {
          statusCode: 500,
        }
      );
    }
  }
}

module.exports = new homiliService();
