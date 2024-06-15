import React from 'react';
import {
  BsHeartPulseFill,
  BsGenderAmbiguous,
  BsPersonFill,
  BsDropletHalf,
  BsCalendarHeart,
  BsTelephoneForwardFill,
  BsCapsulePill,
  BsPrescription,
  BsEyedropper,
  BsVirus,
  BsFileMedical,
  BsPersonArmsUp,
  BsLungsFill
} from "react-icons/bs";

function Home({ patientData }) {
  if (!patientData) {
    return <main className='main-container'><div className='main-title'><h3>Loading...</h3></div></main>;
  }

  const getSpecialityDetails = (speciality) => {
    switch (speciality) {
      case 'CardiovascularDiseases':
        return { icon: <BsHeartPulseFill className="icon" />, bgColor: 'red' };
      case 'Diabetes':
        return { icon: <BsCapsulePill className="icon" />, bgColor: 'green' };
      case 'MajorAllergies':
        return { icon: <BsPrescription className="icon" />, bgColor: 'blue' };
      case 'SurgicalDetails':
        return { icon: <BsEyedropper className="icon" />, bgColor: 'orange' };
      case 'ENT':
        return { icon: <BsVirus className="icon" />, bgColor: 'purple' };
      case 'Cancer':
        return { icon: <BsVirus className="icon" />, bgColor: 'purple' };
      case 'Pediatrics':
        return { icon: <BsPersonArmsUp className="icon" />, bgColor: 'orange' };
      case 'Gynaecology':
        return { icon: <BsEyedropper className="icon" />, bgColor: 'blue' };
      case 'CardiovascularDiseases':
        return { icon: <BsLungsFill className="icon" />, bgColor: 'red' };
      default:
        return { icon: <BsFileMedical className="icon" />, bgColor: 'red' };
    }
  }

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>MEDICAL HISTORY</h3>
      </div>
      <div className='patient-details'>
        {patientData.MedicalHistory.map((history, index) => {
          const { icon, bgColor } = getSpecialityDetails(history.Category);
          return (
            <div key={index} className="medical-records" style={{ backgroundColor: bgColor, padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
              <p><strong>Speciality:</strong> {history.Speciality} {icon}</p>
              <p><strong>Details:</strong> {history.Details}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Home;
