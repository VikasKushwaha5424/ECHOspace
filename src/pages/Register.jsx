import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// FIX: Removed 'storage' since it's not used
import { auth, db } from "../firebase"; 
// FIX: Removed unused storage functions
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // const file = e.target[3].files[0]; // Avatar file, if you add it back

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //For this simple version, we'll just use a blank photoURL
      // If you add avatar upload back, the logic goes here.

      //Update profile
      await updateProfile(res.user, {
        displayName,
        photoURL: "", // Defaulting to no photo
      });

      //create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: "", // Defaulting to no photo
        // Add the selectedBg field with a default value
        selectedBg: "default", 
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
      
      setLoading(false);
      navigate("/");

    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    // Use the new, static class name
    <div className="register-page">
      {/* Left side: Form */}
      <div className="form-box">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            required
            placeholder="Enter Your First Name"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter Your email"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter Password (min 6 chars)"
          />

          {/* Add file input here if you want avatar on register
          <label htmlFor="file">Add an avatar (optional):</label>
          <input type="file" id="file" />
          */}
          
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
          
          {err && <span className="er">* Something went wrong</span>}
        </form>
        <p>
          You do have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
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
    </div>
  );
}
