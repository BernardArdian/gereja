const mongoose = require('mongoose')

const AdministratifPerkawinanShema = new mongoose.Schema({
    id: {
        type: String, require : true
    },
    nama_suami: {
        type: String, require : true
    },
    nama_suami: {
        type: String, require : true
    },
    tgl_perkawinan: {
        type : Date
    },
    place: {
        type : String
    }
})

module.exports = mongoose.model('AdministratifPerkawinan', AdministratifPerkawinanShema)