import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientReg.css";

const PatientReg = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    PatientID: "",
    PatientName: "",
    Gender: "Male",
    BloodGroup: "",
    DOB: "",
    PatientContactNumber: "",
    Relatives: [
      { RelativeName: "", Relationship: "", RelativeContactNumber: "" },
    ],
    MedicalHistory: [{ Speciality: "", Details: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRelativeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRelatives = [...formData.Relatives];
    updatedRelatives[index][name] = value;
    setFormData({
      ...formData,
      Relatives: updatedRelatives,
    });
  };

  const handleMedicalHistoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMedicalHistory = [...formData.MedicalHistory];
    updatedMedicalHistory[index][name] = value;
    setFormData({
      ...formData,
      MedicalHistory: updatedMedicalHistory,
    });
  };

  const addRelativeItem = () => {
    setFormData({
      ...formData,
      Relatives: [
        ...formData.Relatives,
        { RelativeName: "", Relationship: "", RelativeContactNumber: "" },
      ],
    });
  };

  const addHistoryItem = () => {
    setFormData({
      ...formData,
      MedicalHistory: [
        ...formData.MedicalHistory,
        { Speciality: "", Details: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
    try {
      const result = await axios.post(
        "http://localhost:5000/patient-register",
        formData
      );
      console.log(result);
      if (result.data.status === "user already found") {
        window.alert("User already found");
      } else if (result.data.status === "success") {
        navigate("/scan", { state: { formData } });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container">
      <h2>Patient Data Entry Form</h2>
      <form id="patientForm" onSubmit={handleSubmit} className="PatRegForm">
        <label htmlFor="PatientID">Patient ID:</label>
        <input
          type="text"
          id="PatientID"
          name="PatientID"
          value={formData.PatientID}
          onChange={handleChange}
          required
        />

        <label htmlFor="PatientName">Patient Name:</label>
        <input
          type="text"
          id="PatientName"
          name="PatientName"
          value={formData.PatientName}
          onChange={handleChange}
          required
        />

        <label htmlFor="Gender">Gender:</label>
        <select
          id="Gender"
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="BloodGroup">Blood Group:</label>
        <input
          type="text"
          id="BloodGroup"
          name="BloodGroup"
          value={formData.BloodGroup}
          onChange={handleChange}
          required
        />

        <label htmlFor="DOB">Date of Birth:</label>
        <input
          type="date"
          id="DOB"
          name="DOB"
          value={formData.DOB}
          onChange={handleChange}
          required
        />

        <label htmlFor="PatientContactNumber">Patient Contact Number:</label>
        <input
          type="text"
          id="PatientContactNumber"
          name="PatientContactNumber"
          value={formData.PatientContactNumber}
          onChange={handleChange}
          required
        />

        <h3>Relative Details</h3>
        <div id="relativeDetails">
          {formData.Relatives.map((relative, index) => (
            <div key={index} className="relativeItem">
              <label htmlFor={`RelativeName${index}`}>Relative Name:</label>
              <input
                type="text"
                id={`RelativeName${index}`}
                className="relativeName"
                name="RelativeName"
                value={relative.RelativeName}
                onChange={(e) => handleRelativeChange(index, e)}
                required
              />

              <label htmlFor={`Relationship${index}`}>Relationship:</label>
              <input
                type="text"
                id={`Relationship${index}`}
                className="relationship"
                name="Relationship"
                value={relative.Relationship}
                onChange={(e) => handleRelativeChange(index, e)}
                required
              />

              <label htmlFor={`RelativeContactNumber${index}`}>
                Relative Contact Number:
              </label>
              <input
                type="text"
                id={`RelativeContactNumber${index}`}
                className="relativeContactNumber"
                name="RelativeContactNumber"
                value={relative.RelativeContactNumber}
                onChange={(e) => handleRelativeChange(index, e)}
                required
              />
            </div>
          ))}
        </div>

        <button type="button" className="add-button" onClick={addRelativeItem}>
          Add Another Relative
        </button>

        <h3>Medical History</h3>
        <div id="medicalHistory">
          {formData.MedicalHistory.map((history, index) => (
            <div key={index} className="historyItem">
              <label htmlFor={`Speciality${index}`}>Speciality:</label>
              <select
                id={`Speciality${index}`}
                className="category"
                name="Speciality"
                value={history.Speciality}
                onChange={(e) => handleMedicalHistoryChange(index, e)}
                required
              >
                <option value="" disabled>
                  Select Speciality
                </option>
                <option value="CardiovascularDiseases">
                  Cardiovascular Diseases
                </option>
                <option value="Diabetes">Diabetes</option>
                <option value="Cancer">Cancer</option>
                <option value="MajorAllergies">Major Allergies</option>
                <option value="SurgicalHistory">Surgical History</option>
                <option value="gynaecology">Gynaecology</option>
                <option value="NeurologicalDisorders">
                  Neurological Disorders
                </option>
                <option value="ENT">ENT</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="RespiratoryDiseases">
                  Respiratory Diseases
                </option>
                <option value="KidneyDiseases">Kidney Diseases</option>
                <option value="LiverDiseases">Liver Diseases</option>
                <option value="EndocrineDisorders">Endocrine Disorders</option>
                <option value="GastrointestinalDiseases">
                  Gastrointestinal Diseases
                </option>
                <option value="ophthalmologist">ophthalmologist</option>
                <option value="InfectiousDiseases">Infectious Diseases</option>
                <option value="PsychiatricDisorders">
                  Psychiatric Disorders
                </option>
                <option value="DermatologicalConditions">
                  Dermatological Conditions
                </option>
                <option value="AutoimmuneDiseases">Autoimmune Diseases</option>
                <option value="OtherMedicalConditions">
                  Other Medical Conditions
                </option>
              </select>

              <label htmlFor={`Details${index}`}>Details:</label>
              <textarea
                id={`Details${index}`}
                className="details"
                name="Details"
                value={history.Details}
                onChange={(e) => handleMedicalHistoryChange(index, e)}
                required
              ></textarea>
            </div>
          ))}
        </div>
        <button type="button" className="add-button" onClick={addHistoryItem}>
          Add Medical History Category
        </button>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientReg;
