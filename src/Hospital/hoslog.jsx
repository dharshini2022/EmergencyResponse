//hoslogin
import React from "react";
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    backgroundImage:
      "url(https://www.agspecialtyservices.com/wp-content/uploads/2015/08/medical-Care-Provider-in-charge-symbol_mgn.jpg)",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "75%", // Adjusted width to take up half of the screen
    padding: "2rem",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    margin: "200px 800px 100px 10px",
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
    padding: "0.5rem",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  link: {
    display: "block",
    marginTop: "1rem",
    color: "#007bff",
    textDecoration: "none",
    marginBottom: "10px",
  },
  linkHover: {
    color: "#0056b3",
    textDecoration: "underline",
  },
};

function HosLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to HospitalDisplay upon successful login
    navigate("/incharge");
  };
  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <div style={styles.card}>
          <h2 style={styles.title}>Hospital Login</h2>
          <form>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Hospital ID</label>
              <input
                type="text"
                placeholder="Enter your Hospital ID"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button} onClick={handleSubmit}>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HosLogin;