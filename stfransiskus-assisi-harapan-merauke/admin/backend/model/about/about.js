const mongoose = require('mongoose')

// Menyimpan satu bagian informasi profil gereja dalam bentuk teks detail.
const AboutSchema = new mongoose.Schema({
    id: { type: String, require: true },
    detail: { type: String, require: true }
})

module.exports = mongoose.model('About',AboutSchema)