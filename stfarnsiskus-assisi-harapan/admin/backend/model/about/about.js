const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    id: { type: String, require: true },
    detail: { type: String, require: true }
})

module.exports = mongoose.model('About',AboutSchema)