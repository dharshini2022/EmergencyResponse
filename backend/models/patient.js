const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    PatientID: { type: String, required: true },
    PatientName: { type: String, required: true },
    Gender: { type: String, required: true },
    BloodGroup: { type: String, required: true },
    DOB: { type: Date, required: true },
    PatientContactNumber: { type: String, required: true },
    RelativeDetails: [
        {
            RelativeName: { type: String, required: true },
            Relationship: { type: String, required: true },
            RelativeContactNumber: { type: String, required: true }
    }],
    MedicalHistory: [{
        Speciality: { type: String, required: true },
        Details: { type: String, required: true }
    }]
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = {Patient};