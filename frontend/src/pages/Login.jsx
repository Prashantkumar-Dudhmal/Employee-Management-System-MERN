import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        username: username,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:2002/auth/login",
        credentials
      );
      if (response.data.success) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err);
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="loggin">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name</label>
          <input
            className="pp"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className="pp"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
