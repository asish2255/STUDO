import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signup(email, password);

    if (!res.success) {
      setError(res.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="page-shell">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Sign Up</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
