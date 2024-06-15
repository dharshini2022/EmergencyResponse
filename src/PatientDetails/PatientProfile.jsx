import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Home from '../Home';

function PatientProfile() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const phoneNumber = queryParams.get('phone');

    if (phoneNumber) {
      async function fetchPatientData() {
        try {
          const response = await fetch(`http://localhost:5000/patients/by-phone?phone=${phoneNumber}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setPatientData(data);
        } catch (error) {
          console.error('Error fetching patient data:', error);
          setError(error.message);
        }
      }

      fetchPatientData();
    } else {
      setError('No phone number provided');
    }
  }, [location.search]);

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
            patientData={patientData}
          />
          <Home patientData={patientData} />
        </>
      )}
    </div>
  );
}

export default PatientProfile;
