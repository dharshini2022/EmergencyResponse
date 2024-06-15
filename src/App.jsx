import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import Scan from './PatientDetails/Scan';
import InchargeLogin from './Incharge/InchargeLogin';
import InchargeHome from './Incharge/InchargeHome';
import AddMed from './PatientDetails/AddMedicalRecords';
import PatientReg from './PatientDetails/PatientReg';
import PatientLogin from './PatientDetails/PatientLogin';
import PatientProfile from './PatientDetails/PatientProfile';
import LoginSelection from './LoginSelection';
import PatientScan from './Incharge/PatientScan';
import HosLogin from './Hospital/Hoslogin';
import HospitalDisplay from './Hospital/HospitalDisplay';
import InchargeDisplay from './Hospital/InchargeDisplay';
import AdminLogin from './Admin/AdminLogin';


function App() {
  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  // const OpenSidebar = () => {
  //   setOpenSidebarToggle(!openSidebarToggle)
  // }

  return (
    <Routes>
      <Route path="/" element={<LoginSelection/>}></Route>
      <Route path="/patientProfile" element={<PatientProfile/>}></Route>
      <Route path="/preg" element={<PatientReg/>}>  </Route>
      <Route path="/plog" element={<PatientLogin/>}></Route>
      <Route path="/pscan" element={<PatientScan/>}></Route>
      <Route path="/scan" element={<Scan/>}></Route>
      <Route path="/AddMed" element={<AddMed/>}></Route>
      <Route path="/IncLog" element={<InchargeLogin />}></Route>
      <Route path="/IncHome" element={<InchargeHome />}></Route>
      <Route path="/hoslogin" element={<HosLogin />}></Route>
      <Route path="/hospital" element={<HospitalDisplay />}></Route>
      <Route path="/hoslogin" element={<HospitalDisplay />}></Route>
      <Route path="/adminlogin" element={<AdminLogin />}></Route>
      <Route path="/incharge" element={<InchargeDisplay/>}></Route>
      
    </Routes>
  )
}

export default App