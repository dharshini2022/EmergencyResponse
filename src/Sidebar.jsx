import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {
  BsClipboard2PulseFill,
  BsGenderAmbiguous,
  BsPersonFill,
  BsDropletHalf,
  BsCalendarHeart,
  BsTelephoneForwardFill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar, patientData }) {
  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand" style={{ color: 'blue' }}>
            <BsClipboard2PulseFill className="icon" style={{ color: 'blue' }} />
            <span style={{ color: 'blue' }}>Patient Portal</span>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <BsPersonFill className="icon" /> Name : {patientData.PatientName}
        </li>
        <li className="sidebar-list-item">
          <BsGenderAmbiguous className="icon" /> Gender : {patientData.Gender}
        </li>
        <li className="sidebar-list-item">
          <BsDropletHalf className="icon" /> Blood Group : {patientData.BloodGroup}
        </li>
        <li className="sidebar-list-item">
          <BsCalendarHeart className="icon" /> DOB : {new Date(patientData.DOB).toDateString()}
        </li>
        <li className="sidebar-list-item">
          <BsTelephoneForwardFill className="icon" /> Contact Number : {patientData.PatientContactNumber}
        </li>
        <li className="sidebar-list-item">
            <Button component={Link} to="/AddMed" variant="contained" color="primary">
            Add Medical Details
            </Button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
