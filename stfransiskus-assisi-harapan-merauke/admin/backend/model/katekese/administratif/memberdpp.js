const mongoose = require("mongoose");

// Skema anggota DPP pada halaman administratif, termasuk validasi ekstensi foto.
const memberdppSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  photos: {
    type: String,
    required: true,
    validate: {
      validator : function(v) {
        return /\.(jpg|jpeg|png)$/i.test(v);
      },
      message: (props) =>
        `${props.value} format foto tidak sesuai (jpg, jpeg, png)!`,
    },
  },
  periode: { type: String, required: true },
  jabatan: { type: String, required: true },
});

module.exports = mongoose.model("memberdpp", memberdppSchema);
