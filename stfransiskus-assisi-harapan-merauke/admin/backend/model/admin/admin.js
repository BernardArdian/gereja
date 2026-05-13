const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, // Otomatis buat UUID
        unique: true,
    },
    adminname: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        required: true,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);