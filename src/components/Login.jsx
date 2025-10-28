import React, { useState } from 'react';
import './Login.scss'; // Create styles for the new layout

const TermsModal = ({ show, onClose }) => (
  show ? (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Terms and Conditions</h2>
        <div className="modal-content">
          <p>
            <b>The "Terms and Conditions" (The Not-Boring Version)</b><br/>
            Hey there! Welcome to ECHOspace. By using this app...<br/>
            {/* Copy all your terms here */}
            1. The "Be Cool" Rule (A.K.A. Don't Be a Jerk)…<br/>
            {/* etc. */}
          </p>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null
);

export default function Login() {
  const [showTerms, setShowTerms] = useState(false);
  return (
    <div className="login-page">
      <div className="login-box">
        <h1>ECHOspace Login</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required autoFocus />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <button className="terms-btn" onClick={() => setShowTerms(true)}>Terms & Conditions</button>
      </div>
      <div className="logo-box">
        <h1 className="echo-logo-text">ECHOspace</h1>
        <img src="/echospace_logo.jpg" alt="ECHOspace logo" className="echo-logo-img"/>
      </div>
      <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}
