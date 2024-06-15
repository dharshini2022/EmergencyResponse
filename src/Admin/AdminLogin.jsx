import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  body: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "#001f3f",
  },
  formContainer: {
    width: "800px",
    maxWidth: "100%",
    margin: "50px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    display: "flex",
    overflow: "hidden",
    flexDirection: "row-reverse", // Change the direction to row-reverse
  },
  formImage: {
    flex: 1,
    background:
      "url('https://th.bing.com/th/id/OIP.xQpFZir86So8yavy3s__fwAAAA?rs=1&pid=ImgDetMain') no-repeat center center",
    backgroundSize: "cover",
  },
  card: {
    flex: 1,
    padding: "40px",
    background: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    width: "100%",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    marginBottom: "1.5rem",
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
  apiResponse: {
    marginTop: "20px",
    textAlign: "left",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

function AdminLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState(null);
  const [loggedInInchargeID, setLoggedInInchargeID] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === "ADMIN" && password === "admin@123") {
      const fakeApiResponse = {
        status: "success",
        message: "Login successful!",
        inchargeID: id,
      };
      setResponse(fakeApiResponse);
      setLoggedInInchargeID(id);
      alert("Login successful!");
      navigate("/hospital");
    } else {
      setResponse({
        status: "error",
        message: "Invalid credentials",
      });
      alert("Invalid credentials!");
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot Password Clicked");
    // Add your logic for handling forgot password functionality here
  };

  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <div style={styles.card}>
          <h1 style={styles.title}>Admin Login</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="username" style={styles.label}>
              Admin Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={styles.input}
            />
            <label htmlFor="password" style={styles.label}>
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            {/* <div className="checkbox-label">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password" style={styles.label}>
                Show Password
              </label>
            </div> */}
            <input type="submit" value="Submit" style={styles.button} />
          </form>
        </div>
        <div style={styles.formImage}></div>
      </div>
    </div>
  );
}

export default AdminLogin;