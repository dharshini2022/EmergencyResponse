import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
  body: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  formContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    backgroundImage:
      "url(https://thumbs.dreamstime.com/b/stethoscope-isolated-black-background-top-view-photograph-sterile-doctors-office-desk-medical-accessories-reflective-table-94174159.jpg?w=768)",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "75%", // Adjusted width to take up half of the screen
    padding: "10rem", // Added padding to maintain card spacing
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "2rem",
    fontSize: "1.5rem",
    color: "#343a40",
  },
  inputGroup: {
    marginBottom: "1.5rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#6c757d",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.7rem",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  smallButton: {
    padding: "0.25rem 0.5rem",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.875rem",
    display: "inline-block",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
};

function PatientLogin() {
  const [PatientContactNumber, setPatientContactNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [getOtp, setGetOtp] = useState("");
  const navigate = useNavigate();

  const handleGetOtp = async () => {
    try {
      const result = await axios.post("http://localhost:5000/otp", { PatientContactNumber });
      console.log(result.data.otpG);
      if (result.data.status === "success") {
        setGetOtp(result.data.otpG);
        window.alert("OTP sent successfully");
      } else if (result.data.status === "user not found") {
        window.alert("User not found");
      } else {
        window.alert("OTP not sent successfully");
      }
    } catch (error) {
      console.error("Error getting OTP:", error);
      window.alert("OTP not sent successfully");
    }
  };

  const handleLogin = async () => {
    console.log('otp', getOtp.otpG);
    console.log('getOtp', getOtp);
    if (otp === getOtp.otpG) { 
      console.log('otp',otp);
      console.log('getOtp',getOtp.otpG)
      try {
        const result = await axios.post("http://localhost:5000/patient-login", { PatientContactNumber });
        if (result.data.status === "success") {
          console.log(result.data);
          console.log("Logged in");
          navigate(`/patientProfile?phone=${PatientContactNumber}`);
        } else if (result.data.status === "invalid user") {
          window.alert("Invalid user");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      window.alert("Enter correct OTP");
    }
  };

  const handleChangeOtp = (e) => {
    e.preventDefault();
    setOtp(e.target.value);
    console.log('handleChangeOtp', e.target.value)
  };

  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <div style={styles.card}>
          <h2 style={styles.title}>Patient Login</h2>
          <form>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <input
                type="email"
                placeholder="Enter your Phone Number"
                required
                style={styles.input}
                onChange={(e) => setPatientContactNumber(e.target.value)}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>OTP</label>
              <input
                type="password"
                placeholder="Enter your OTP"
                required
                style={styles.input}
                onChange={handleChangeOtp}
              />
            </div>
            <button
              type="button"
              style={styles.smallButton}
              onClick={handleGetOtp}
            >
              Get OTP
            </button>
            <button onClick={handleLogin} type="submit" style={styles.button}>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;