const mongoose = require('mongoose')

// Skema isi renungan/homili dengan tema, penulis, dan uraian.
const RenuganSchema = new mongoose.Schema({
    id: { type: String, require: true },
    tema: { type: String },
    author: { type: String, require: true },
    detail: { type: String, require: true }
}, { createdAt: { Date } })

module.exports = mongoose.model('Renungan', RenuganSchema)