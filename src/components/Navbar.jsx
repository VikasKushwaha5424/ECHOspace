import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase"; // Import db
import { doc, updateDoc } from "firebase/firestore"; // Import doc and updateDoc
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import TermsModal from "./TermsModal";
import Avatar from "./Avatar";

// --- Background Selector Modal ---
// We can define this small modal right inside Navbar.jsx
const BgSelectorModal = ({ show, onClose, onSelect, currentBg }) => {
  // These paths MUST match the files you put in public/img/
  const bgOptions = [
    { id: "default", name: "Default", src: "default-bg" },
    { id: "bg1.jpeg", name: "Fun", src: "/img/bg1.jpeg" },
    { id: "bg2.jpeg", name: "Light Black", src: "/img/bg2.jpeg" },
    { id: "bg3.jpeg", name: "White Doodle", src: "/img/bg3.jpeg" },
    { id: "bg4.jpeg", name: "Teal", src: "/img/bg4.jpeg" },
    { id: "bg5.jpeg", name: "Pink", src: "/img/bg5.jpeg" },
    { id: "bg6.jpeg", name: "Yellow", src: "/img/bg6.jpeg" },
    { id: "bg7.jpeg", name: "Black", src: "/img/bg7.jpeg" },
    { id: "bg8.jpeg", name: "Dark Green", src: "/img/bg8.jpeg" },
  ];

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal bg-selector-modal">
        <h2>Choose Chat Background</h2>
        <div className="bg-options-grid">
          {bgOptions.map((bg) => (
            <div
              key={bg.id}
              className={`bg-option ${currentBg === bg.id ? "selected" : ""}`}
              style={{
                backgroundImage:
                  bg.src === "default-bg" ? "none" : `url(${bg.src})`,
                backgroundColor:
                  bg.src === "default-bg"
                    ? "var(--bg-main)"
                    : "transparent",
              }}
              data-bg-id={bg.src.includes("default") ? bg.src : ""}
              onClick={() => onSelect(bg.id)}
            >
              <div className="bg-name">{bg.name}</div>
            </div>
          ))}
        </div>
        {/* THIS IS THE MISSING/FIXED CLOSE BUTTON */}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// --- Navbar Component ---
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showSettings, setShowSettings] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showBgModal, setShowBgModal] = useState(false);

  // This function saves the background choice to Firebase
  const handleBgSelect = async (bgId) => {
    if (!currentUser || !currentUser.uid) return;

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        selectedBg: bgId,
      });
      // AuthContext will automatically pick up this change
    } catch (err) {
      console.error("Error updating background:", err);
    }
  };

  return (
    <>
      <div className="navbar">
        <span className="logo">ECHOspace</span>
        <div className="user">
          <Avatar
            displayName={currentUser.displayName}
            photoURL={currentUser.photoURL}
            size="avatar-small"
          />
          <span>{currentUser.displayName}</span>
          <button
            className="settings-button"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Toggle settings menu"
          >
            {/* Settings SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>

          {showSettings && (
            <div className="settings-menu">
              <button onClick={() => toggleTheme()}>
                {/* Moon Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                Toggle {theme === "light" ? "Dark" : "Light"} Mode
              </button>
              <button onClick={() => setShowBgModal(true)}>
                {/* Image Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Change Background
              </button>
              <button onClick={() => setShowTerms(true)}>
                {/* File Text Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Terms & Conditions
              </button>
              <button onClick={() => signOut(auth)}>
                {/* Log Out Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Render the modals */}
      <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
      <BgSelectorModal
        show={showBgModal}
        onClose={() => setShowBgModal(false)}
        onSelect={handleBgSelect}
        currentBg={currentUser.selectedBg || "default"}
      />
    </>
  );
};

export default Navbar;

