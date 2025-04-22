const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const { Patient } = require("./models/patient");
const Incharge = require("./models/incharge");
const Hospital = require("./models/hospital");
require('dotenv').config(); 

// Import functions from PatientAuth.js
const {
    patientLogin,
    patientRegister,
    otpGenerate,
    patientFingerLogin,
    patientFingerRegister,
    fingerLoginData,
    fingerRegistration
} = require('./api/PatientAuth');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const mongoDBConnectionString = process.env.MONGODB_URI || 'mongodb+srv://dharshinikarthik06:KN6zPSPlcVaHaiQC@emergencyresponse.pmghcdc.mongodb.net/medical';

mongoose.connect(mongoDBConnectionString, {})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); 
    });

app.use(express.json());

app.get('/incharge', async (req, res) => {
    try {
      const inchargeDetails = await Incharge.find();
      res.json(inchargeDetails);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    app.post('/addhospitals', async (req, res) => {
        const { id, name, address, contactNumber, email } = req.body;
        const newHospital = new Hospital({ id, name, address, contactNumber, email });
      
        try {
          await newHospital.save();
          res.status(201).json(newHospital);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      });

    

    // Hospital Login API
app.get("/hospitals/:hospitalID/:password", async (req, res) => {
    try {
      const { hospitalID, password } = req.params;
      const hospital = await Hospital.findOne({ id: hospitalID, password });
  
      if (!hospital) {
        return res
          .status(404)
          .json({ message: "Hospital not found or wrong credentials" });
      }
  
      console.log("Hospital Details:", hospital);
      res.json({ message: "Login successful", hospital });
    } catch (err) {
      console.error("Error retrieving hospital details:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete('/hospitals/:id', async (req, res) => {
    try {
        const hospitalId = req.params.id;
        const removedHospital = await Hospital.findOneAndDelete({ id: hospitalId });
        if (!removedHospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        const deletedIncharges = await Incharge.deleteMany({ hospitalId: hospitalId });
        res.status(200).json({
            message: 'Hospital and associated incharges removed successfully',
            deletedInchargesCount: deletedIncharges.deletedCount
        });

    } catch (error) {
        console.error('Error removing hospital and incharges:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

    
    
//incharge api
app.get("/incharges", async (req, res) => {
    try {
      const incharges = await Incharge.find();
  
      if (!incharges || incharges.length === 0) {
        return res.status(404).json({ message: "No incharges found" });
      }
  
      console.log(incharges);
      res.json(incharges);
    } catch (err) {
      console.error("Error retrieving incharge details:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
//incharge login api
app.get("/incharges/:inchargeID/:password", async (req, res) => {
    try {
      const { inchargeID, password } = req.params;
      const incharge = await Incharge.findOne({
        inchargeId: inchargeID,
        password: password,
      });
  
      if (!incharge) {
        return res.status(404).json({ message: "Incharge not found" });
      }
  
      console.log("Incharge Details:", incharge);
      res.json(incharge);
    } catch (err) {
      console.error("Error retrieving incharge details:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post('/addincharge', async (req, res) => {
    try {
      const newIncharge = await Incharge.create(req.body);
      res.status(201).json(newIncharge);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //Remove incharge details
  app.delete('/incharge/:id', async (req, res) => {
    try {
      const removedIncharge = await Incharge.findOneAndDelete({ inchargeId: req.params.id });
      if (!removedIncharge) {
        return res.status(404).json({ message: 'Incharge not found' });
      }
      res.json({ message: 'Incharge removed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
  
const fast2smsApiKey = process.env.FAST2SMS_API_KEY;

app.post('/patient-finger-register', async (req, res) => {
    try {
        const result = await patientFingerRegister();
        res.send({status:"success",result});
    } catch (error) {   
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.post('/patient-finger-login', async (req, res) => {
    try {
        const result = await patientFingerLogin();
        res.send({status:"success",document:fingerLoginData});
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.get('/finger-print-login-data',(req,res)=>{
    res.send(fingerLoginData);
})

app.get('/finger-print-register-status',(req,res)=>{
    res.send(fingerRegistration)
})


app.post('/otp', async (req, res) => {
    const { PatientContactNumber } = req.body;
    console.log('Request to generate OTP for:', PatientContactNumber); // Log incoming request

    try {
        const otp = await otpGenerate(PatientContactNumber);
        console.log('Generated OTP:', otp); // Log generated OTP

        const message = `Your OTP for login is: ${otp.otpG}`;
        const smsData = {
            // sender_id: 'FSTSMS',
            message: message,
            language: 'english',
            route: 'q',
            flash:'0',
            numbers: PatientContactNumber
        };

        const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', smsData, {
            headers: {
                'authorization': fast2smsApiKey,
                'Content-Type': 'application/json'
            }
        });

        console.log('SMS API response:', response.data); // Log API response
        res.json({
            status: 'success',
            message: 'OTP sent successfully',
            otpG: otp  // include this line to return the generated OTP
        });
    } catch (error) {
        console.error('Error sending OTP via Fast2SMS:', error.response ? error.response.data : error.message);
        res.status(500).json({
            status: 'error',
            message: 'Failed to send OTP',
            error: error.response ? error.response.data : error.message  // Include error message for debugging
        });
    }
});


// Example routes:

// Fetch all patients
app.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }
        res.json(patients);
    } catch (err) {
        console.error('Error retrieving patients:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/patients/by-phone', async (req, res) => {
    try {
        const { phone } = req.query;
        if (!phone) {
            return res.status(400).json({ message: 'Phone number is required' });
        }

        const patient = await Patient.findOne({ PatientContactNumber: phone });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (err) {
        console.error('Error retrieving patient:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Fetch patient by ID
app.get('/patient/:patientID', async (req, res) => {
    try {
        const { patientID } = req.params;
        const patient = await Patient.findOne({ PatientID: patientID });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        console.error('Error retrieving patient details:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Handle patient login
app.post('/patient-login', async (req, res) => {
    const { PatientContactNumber } = req.body;
    try {
        const result = await patientLogin(PatientContactNumber, process.env.secretKeyForJwt);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Handle patient registration
app.post('/patient-register',async(req,res)=>{
    const patientId = req.body.PatientID
    const patientContactNumber = req.body.PatientContactNumber
    const gender  = req.body.Gender
    const bloodGroup = req.body.BloodGroup
    const dob = req.body.DOB
    const patientName = req.body.PatientName
    const relativeDetails = req.body.Relatives
    const medicalHistory = req.body.MedicalHistory
    const result = await patientRegister(patientId,patientName,gender,bloodGroup,dob,patientContactNumber,relativeDetails,medicalHistory,process.env.secretKeyForJwt)
    res.send(result)
})

// Handle updating medical records for a patient
app.put('/patients/:patientID/medicalRecords', async (req, res) => {
  const { patientID } = req.params;
  const { medicalRecords } = req.body;
  const patient = await Patient.findOne({ PatientID: patientID });
  console.log(patient.MedicalHistory);

  console.log("Received Request Body:", req.body); // Debugging log

  try {
      if (!medicalRecords || !Array.isArray(medicalRecords)) {
          return res.status(400).json({ message: "Invalid medicalRecords format. It should be a non-empty array." });
      }

      const patient = await Patient.findOne({ PatientID: patientID });
      console.log(patient);

      if (!patient) {
          return res.status(404).json({ message: 'Patient not found' });
      }

      // Ensure `MedicalHistory` is initialized
      if (!patient.MedicalHistory) {
          patient.MedicalHistory = [];
      }

      // Append new medical records
      patient.MedicalHistory.push(...medicalRecords);
      await patient.save();

      res.status(200).json({ message: 'Medical records updated successfully', patient });
  } catch (error) {
      console.error('Error updating medical records:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


app.post("/hoslogin", async (req, res) => {
    const { id, password } = req.body;
  
    try {
      const hospital = await Hospital.findOne({ id });
      console.log(Hospital.password, Hospital);
      if (hospital && hospital.password === password) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid ID or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

//   app.post("/patient-scan", async (req, res) => {
//     try {
//         // Simulate fingerprint login
//         // const fingerprintResult = await axios.post("http://localhost:5000/patient-finger-login");

//         // Simulate ISO template retrieval
//         const isoTemplateResult = {
//             data: {
//                 ISOTemplate: {
//                     $binary: {
//                         base64:
//                             "Rk1SACAyMAAAAAEIAAABPAFiAMUAxQEAAAAoJ4CNAKJ6AEBvAOP4AECvAQXkAEBBAKkJAICAAGZ3AEDxAKpqAEBNAGaGAICNATZ9AEAmAH2YAICHAUToAIDJAT5HAIDbAEbqAEC4ACRqAEChAOF3AECZAItyAIBhAPuTAIC1AHJsAEAzANCZAEAjAMWRAIDsAIVpAEDMASRcAEBoAToBAEBuAUGiAEEQAO9mAEDpAEtpAIBIACh5AECFAOt6AEB4AQWNAEDQAJXqAIA8AJmTAECCASWKAED0AOriAEC6ASvfAEB5AEh1AEBEAFGAAED3AGplAECnADVtAEA8AT6zAEAiAU2rAAAA",
//                         subType: "00",
//                     },
//                 },
//             },
//         };

//         console.log("ISO Template:", isoTemplateResult.data.ISOTemplate);

//         // Prepare SMS data
//         const locationLink = `https://www.google.com/maps?q=${req.body.latitude},${req.body.longitude}`;
//         const message = `User ${smsData.PatientName} is admitted to the hospital. Location: ${locationLink}`;
//         const smsData = {
//             _id: "666969299fddb8f1b50a6ba8",
//             PatientID: "P2",
//             PatientName: "siva",
//             Gender: "Male",
//             BloodGroup: "AB+",
//             DOB: "2004-05-16T00:00:00.000Z",
//             PatientContactNumber: "6379756658",
//             RelativeDetails: [
//                 {
//                     RelativeName: "DHEVA",
//                     Relationship: "frnd",
//                     RelativeContactNumber: "8098323704", // Fixed number for SMS
//                     _id: "666969299fddb8f1b50a6ba9",
//                 },
//             ],
//             MedicalHistory: [
//                 {
//                     Details:
//                         "Oral hypoglycemics are medications taken by mouth to help lower blood glucose levels.",
//                     _id: "666969299fddb8f1b50a6baa",
//                     Speciality: "Diabetes",
//                 },
//                 {
//                     Speciality: "CardiovascularDiseases",
//                     Details:
//                         "Patient has a history of hypertension and coronary artery disease.",
//                     _id: "666cb9f4007110e6c56e0bec",
//                 },
//                 {
//                     Speciality: "Diabetes",
//                     Details:
//                         "Type 2 Diabetes, diagnosed 5 years ago, currently on Metformin.",
//                     _id: "666cb9f4007110e6c56e0bed",
//                 },
//             ],
//             ISOTemplate: isoTemplateResult.data.ISOTemplate,
//         };

//         // Send SMS using Fast2SMS API with location information
//         const smsPayload = {
//             route: "q",
//             message,
//             language: "english",
//             flash: 0,
//             numbers: smsData.RelativeDetails.map((relative) => relative.RelativeContactNumber),
//         };

//         const smsApiKey = "YaMXG9CkpLKPUt2DNA1T6g8ZHdSxoBR3Q7mI0EVFf4jlbvenuhoeSxuW0Y7GygQALrEF8Zq2mUhCOBPv";
//         const smsUrl = "https://www.fast2sms.com/dev/bulkV2";

//         const smsResponse = await axios.post(smsUrl, smsPayload, {
//             headers: {
//                 authorization: smsApiKey,
//                 "Content-Type": "application/json",
//             },
//         });

//         console.log("SMS Response:", smsResponse.data);
//         res.json({ message: "SMS sent successfully" });
//     } catch (error) {
//         console.error("Error sending SMS:", error);
//         res.status(500).json({ error: "Failed to send SMS" });
//     }
// });
//backend to send sms - location

// Endpoint to receive latitude and longitude from frontend
app.post("/send-alert", async (req, res) => {
    const { latitude, longitude } = req.body;
  
    const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    console.log("Location URL:", locationLink); // Print location URL to backend console
  
    const defaultUserName = "Dharshini";
    const phoneNumber = "6379756658"; // Hardcoded phone number
  
    const message = `Patient ${defaultUserName} is admitted to the hospital. Location: ${locationLink}`;
  
    const apiKey =
      "YaMXG9CkpLKPUt2DNA1T6g8ZHdSxoBR3Q7mI0EVFf4jlbvenuhoeSxuW0Y7GygQALrEF8Zq2mUhCOBPv";
    const url = "https://www.fast2sms.com/dev/bulkV2";
  
    const payload = {
      route: "q",
      message,
      language: "english",
      flash: 0,
      numbers: phoneNumber,
    };
  
    try {
      const response = await axios.post(url, payload, {
        headers: {
          authorization: apiKey,
          "Content-Type": "application/json",
        },
      });
  
      console.log("SMS sent successfully:", response.data);
      res.json({ success: true, message: "Alert sent successfully" });
    } catch (error) {
      console.error("Error sending alert:", error);
      res.status(500).json({ success: false, message: "Failed to send alert" });
    }
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});