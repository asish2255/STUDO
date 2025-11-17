import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const success = await login(email, password);

    if (success) navigate("/");
    else setError("Login failed");
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <h2>Login</h2>
        <p>Access your Studo workspace.</p>
      </div>

      <form onSubmit={handleSubmit} className="page-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn primary full">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Don't have an account? <Link to="/signup">Create account</Link>
      </p>
    </div>
  );
}
