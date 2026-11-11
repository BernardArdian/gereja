const mongoose = require('mongoose');

// Menyimpan judul serta uraian syarat administratif suatu sakramen.
const syaratAdministratifchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('SyaratAdministratif', syaratAdministratifchema);