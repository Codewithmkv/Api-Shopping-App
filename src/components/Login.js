import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    try {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("API response data:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        navigate("/products"); // 👈 login success ke baad redirect
      } else {
        setMessage("Invalid credentials!");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="log-box">
        <div className="main">
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            />
            <br />
            <br />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
            <br />
            <br />
            <button id="login-btn" type="submit">Login</button>
        </form>
        <p>{message}</p>
        </div>
    </div>
  );
}

export default Login;
