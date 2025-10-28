import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import TermsModal from "../components/TermsModal"; // Import the modal

export default function Login() {
  const [showTerms, setShowTerms] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    // Use the new, static class name
    <div className="login-page">
      {/* Left side: Form */}
      <div className="form-box">
        <h1>ECHOspace Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoFocus
            placeholder="Enter Your email"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter Password"
          />
          <button type="submit" className="form-button">
            Sign in
          </button>
          {err && <span className="er">* Wrong user Email or Password</span>}
        </form>
        <p>
          You don't have an account?{" "}
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
        <button className="terms-btn" onClick={() => setShowTerms(true)}>
          Terms & Conditions
        </button>
      </div>

      {/* Right side: Logo */}
      <div className="logo-box">
        <h1 className="echo-logo-text">ECHOspace</h1>
        <img
          src="/echospace_logo.png"
          alt="ECHOspace logo"
          className="echo-logo-img"
        />
      </div>

      {/* The Modal */}
      <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}
