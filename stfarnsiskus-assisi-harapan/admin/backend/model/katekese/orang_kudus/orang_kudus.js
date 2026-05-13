const mongoose = require('mongoose')

const Orang_Kudus_Schema = new mongoose.Schema({
    id : { type : String, require   : true },
    name : { type: String, require  : true },
    description: {type : String, require : true},
}, { createdAt: Date })

module.exports = mongoose.model('Orang_Kudus', Orang_Kudus_Schema)