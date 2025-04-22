const { Patient } = require('../models/patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const { spawn } = require('child_process');
const path = require('path'); 

const patientLogin = async (patientContactNumber, secretKeyForJwt) => {
    const patient = await Patient.findOne({ PatientContactNumber: patientContactNumber });
    if (patient) {
        const accessToken = jwt.sign({ patientId: patient.PatientID, PatientName: patient.PatientName }, secretKeyForJwt, { expiresIn: '30m' });
        return { status: "success", accessToken, patient };
    } else {
        return { status: "invalid user" };
    }
};

const otpGenerate = async (patientContactNumber) => {
    const patient = await Patient.findOne({ PatientContactNumber: patientContactNumber });
    if (patient) {
        const otpG = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        return { status: "success", otpG };
    } else {
        return { status: "user not found" };
    }
};

const patientRegister = async (patientId, patientName, gender, bloodGroup, dob, patientContactNumber, relativeDetails, medicalHistory, secretKeyForJwt) => {
    try {
        const check = await Patient.find({ PatientContactNumber: patientContactNumber });
        if (check.length > 0) {
            return { status: "user already found" };
        }
        const patient = await Patient.create({
            PatientID: patientId,
            PatientName: patientName,
            Gender: gender,
            BloodGroup: bloodGroup,
            DOB: dob,
            PatientContactNumber: patientContactNumber,
            RelativeDetails: relativeDetails,
            MedicalHistory: medicalHistory
        });
        const accessToken = jwt.sign({ patientId: patient.PatientID, patientName: patient.PatientName }, secretKeyForJwt, { expiresIn: '30m' });
        return { status: "success", accessToken, patient };
    } catch (err) {
        console.log(err.message);
        return { status: "error in register", err: err.message };
    }
};

var fingerRegistration = ""

const registerCSharpProgram = (PatientID) => {
    return new Promise((resolve, reject) => {
        const exePath = path.resolve("C:\\Users\\dhars\\source\\repos\\fingerPrintProg\\fingerPrintProg\\bin\\Debug\\fingerPrintProg.exe"); // Ensure the path is correct
        const cs = spawn(exePath, ["register", PatientID]);

        let result = '';

        cs.stdout.on('data', (data) => {
            console.log('C# program output:', data.toString().trim());
            result = data.toString().trim();
            if(result==="Fingerprint data updated successfully."){
                fingerRegistration="success"
            }else if(result==="Fingerprint data update failed."){
                fingerRegistration="failed"
            }
        });

        cs.stderr.on('data', (data) => {
            console.error(`Error from C# program: ${data}`);
            reject(data.toString().trim());
        });

        cs.on('close', (code) => {
            if (code === 0) {
                resolve(result);
            } else {
                reject(`C# program exited with code ${code}`);
            }
        });
    });
};

const patientFingerRegister = async () => {
    try {
        const patientsCount = await Patient.countDocuments();
        const newPatientId = "P" + (patientsCount);

        const result = await registerCSharpProgram(newPatientId);
        console.log('Result:', result);
        return { status: 'success', patientId: newPatientId };
    } catch (error) {
        console.error('Error during fingerprint registration:', error);
        return { status: 'error', message: error.message };
    }
};

var fingerLoginData = {}

const patientFingerLogin = async () => {
    try {
        const isoTemplate = await fingerprintScanner.scan();
        return isoTemplate;
        const patientsCount = await Patient.countDocuments();
        const exePath = path.resolve("C:\\Users\\dhars\\source\\repos\\fingerPrintProg\\fingerPrintProg\\bin\\Debug\\fingerPrintProg.exe"); // Ensure the path is correct
        const cs = spawn(exePath, ["login", patientsCount]);

        let temp = "";

        cs.stdout.on('data', async (data) => {
            const result = data.toString().trim();
            console.log(`Result from C# program: ${result}`);
            temp = result;

            try {
                console.log('Temp value:', temp);

                const user = await Patient.findOne({ PatientID: temp });

                if (!user) {
                    console.log("No match found!!!!");
                    return "No match was found!!!!";
                }
                console.log(user);
                fingerLoginData=user;
                return user;
            } catch (error) {
                console.error('Error:', error);
                return 'An error occurred.', error;
            }
        });

        cs.stderr.on('data', (data) => {
            console.error(`Error from C# program: ${data}`);
        });
    } catch (error) {
        console.error('Error during fingerprint login:', error);
        return { status: 'error', message: error.message };
    }
};

module.exports = { patientLogin, patientRegister, otpGenerate, patientFingerRegister, patientFingerLogin,fingerLoginData,fingerRegistration };