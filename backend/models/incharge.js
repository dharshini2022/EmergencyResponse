const mongoose = require('mongoose');

const inchargeSchema = new mongoose.Schema({
    hospitalId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    inchargeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Incharge = mongoose.model('Incharge', inchargeSchema);

module.exports = Incharge;