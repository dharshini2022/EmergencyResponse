import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientScan = () => {
  const [scan, setScan] = useState(false);
  const navigate = useNavigate();

  const handleScanClick = async () => {
    setScan(true);
    try {
      // Simulate scanning delay (Replace with actual scanning logic if needed)
      setTimeout(async () => {
        try {
          // Get user's current location
          const location = await getCurrentLocation();
          console.log("Latitude:", location.latitude);
          console.log("Longitude:", location.longitude);

          // Send location data to backend for SMS
          const smsPayload = {
            latitude: location.latitude,
            longitude: location.longitude,
          };

          // Call the API to send alert with location
          const sendAlertResult = await axios.post(
            "http://localhost:5000/send-alert",
            smsPayload
          );
          console.log("Alert sent result:", sendAlertResult.data);

          // Navigate to /home after 5 seconds
          setTimeout(() => {
            navigate("/patientProfile?phone=6379756658");
          }, 5000);
        } catch (error) {
          console.error("Error retrieving location:", error);
        }
      }, 800);
    } catch (err) {
      console.error("Error starting scanning:", err);
    }
  };

  // Function to get user's current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  return (
    <>
      {!scan && <button onClick={handleScanClick}>Start Scanning</button>}
      {scan && (
        <img
          src="https://i.gifer.com/origin/9c/9c2a750210f1e91d23859d240efed4e1.gif"
          style={{ borderRadius: "60%" }}
          alt="scan"
        />
      )}
    </>
  );
};

export default PatientScan;