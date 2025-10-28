import React from "react";

// This function safely gets the first initial of a name
const getInitial = (name) => {
  if (!name) return "?"; // Return '?' if name is not available
  const trimmedName = name.trim();
  if (trimmedName.length === 0) return "?";
  return trimmedName[0].toUpperCase(); // Get the first letter and make it uppercase
};

const Avatar = ({ displayName, photoURL, size = "avatar-small" }) => {
  return (
    <div className={`avatar ${size}`}>
      {photoURL ? (
        // If user has a photo, display it
        <img
          src={photoURL}
          alt={displayName || "Avatar"}
          className="avatar-image"
          // Add an error fallback in case the image link is broken
          onError={(e) => {
            e.target.style.display = 'none'; // Hide broken image
            // Find the sibling .avatar-initials and display it
            const parent = e.target.parentElement;
            const initials = parent.querySelector('.avatar-initials');
            if (initials) {
              initials.style.display = 'flex';
            }
          }}
        />
      ) : (
        // If no photo, display initials
        <div
          className="avatar-initials"
          // Hide initials by default if photoURL exists, in case it fails
          style={{ display: photoURL ? 'none' : 'flex' }}
        >
          {getInitial(displayName)}
        </div>
      )}
      {/* You can add the status dot back here if you want.
        I've hidden it for now for a cleaner look.
        <span className="avatar-status online"></span> 
      */}
    </div>
  );
};

export default Avatar;