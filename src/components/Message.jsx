import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Avatar from "./Avatar"; // Import the Avatar component

// Helper function to format the timestamp
const formatMessageTime = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwner = message.senderId === currentUser.uid;

  // Determine which user's info to show for the avatar
  const avatarUser = isOwner ? currentUser : data.user;

  return (
    <div
      ref={ref}
      className={`message ${isOwner ? "owner" : ""}`}
    >
      <div className="messageInfo">
        {/* Show Avatar for non-owner messages.
          We hide it for the owner for a cleaner, iMessage-style look.
        */}
        {!isOwner && (
          <Avatar user={avatarUser} size="avatar-small" showStatus={false} />
        )}
      </div>
      <div className="messageContent">
        {/* This is the main text content of the message */}
        {message.text && <p>{message.text}</p>}
        
        {/* Display image if it exists */}
        {message.img && <img src={message.img} alt="Sent" />}
        
        {/* This timestamp was the cause of the "VUNDEFINED" bug. 
            It is now correctly placed *inside* the messageContent 
            and formatted. */}
        <span className="message-time">
          {formatMessageTime(message.date)}
        </span>
      </div>
    </div>
  );
};

export default Message;
