import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InchargeLogin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState(null);
  const [loggedInInchargeID, setLoggedInInchargeID] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:5000/incharges/${id}/${password}`;
      const res = await fetch(url);
      const data = await res.json();
      setResponse(data);

      if (res.status === 200) {
        setLoggedInInchargeID(id);
        navigate("/IncHome", { state: { inchargeID: id } });
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Wrong credentials");
    }
  };

  return (
    <div id="root">
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            background: #001f3f;
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          #root {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }

          #login-form-container {
            width: 800px;
            max-width: 100%;
            margin: 50px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            display: flex;
            overflow: hidden;
          }

          #login-form-image {
            flex: 1;
            background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJOrorFNKd6qinBLcxUwyQzIpK0dbHYN-HwOwavMWxT0gSGdea-U87RcQ87ElR5Oo79rw&usqp=CAU') no-repeat center center;
            background-size: cover;
          }

          #login-form {
            flex: 1;
            padding: 40px;
            background: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
          }

          #login-form h1 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 32px;
            font-weight: bold;
            color: #333;
          }

          #login-form form {
            width: 100%; 
          }

          #login-form form label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: #555;
          }

          #login-form form input[type="text"],
          #login-form form input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 10px;
            font-size: 16px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
          }

          #login-form form input[type="text"]:focus,
          #login-form form input[type="password"]:focus {
            border-color: dodgerblue;
            box-shadow: 0 0 8px rgba(30, 144, 255, 0.2);
          }

          #login-form form input[type="checkbox"] {
            margin-right: 10px;
          }

          #login-form form .checkbox-label {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }

          #login-form form .forgot-password {
            display: block;
            margin-bottom: 20px;
            font-size: 14px;
            color: dodgerblue;
            text-align: right;
            cursor: pointer;
            text-decoration: underline;
          }

          #login-form form input[type="submit"] {
            width: 100%;
            padding: 12px;
            background-color: dodgerblue;
            border: none;
            color: white;
            font-size: 18px;
            font-weight: bold;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: 0 6px 12px rgba(0, 123, 255, 0.2);
            transition: all 0.3s ease;
          }

          #login-form form input[type="submit"]:hover {
            background-color: deepskyblue;
            box-shadow: 0 6px 12px rgba(0, 123, 255, 0.4);
          }

          #login-form form input[type="submit"]:active {
            transform: translateY(2px);
            box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
          }

          #api-response, #logged-in-incharge {
            margin-top: 20px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          }

          #api-response h2, #logged-in-incharge h2 {
            margin: 0;
            font-size: 18px;
            color: #333;
          }
        `}
      </style>
      <div id="login-form-container">
        <div id="login-form-image"></div>
        <div id="login-form">
          <h1>Incharge Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Incharge ID:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <div className="checkbox-label">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password">Show Password</label>
            </div> */}

            <input type="submit" value="Submit" />
          </form>
          {response && (
            <div id="api-response">
              <h2>API Response:</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
          {loggedInInchargeID && (
            <div id="logged-in-incharge">
              <h2>Logged-in Incharge ID:</h2>
              <p>{loggedInInchargeID}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InchargeLogin;