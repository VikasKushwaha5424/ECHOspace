import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext); // Get currentUser from AuthContext

  useEffect(() => {
    // Check if data.chatId is valid before subscribing
    if (data.chatId && data.chatId !== "null") {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  // Determine the background style based on the user's saved preference
  // Default to 'default' if 'selectedBg' doesn't exist yet
  const selectedBg = currentUser.selectedBg || "default";
  
  let bgStyle = {};
  let messagesClassName = "messages";

  if (selectedBg && selectedBg !== "default") {
    // If it's a selected image (e.g., "bg1.jpeg")
    bgStyle = {
      backgroundImage: `url(/img/${selectedBg})`,
    };
    messagesClassName += " has-bg"; // Add class for styling (e.g., add overlay)
  } else {
    // It's the "default", so no inline style is needed
    // The CSS variables (--bg-main) will take care of it
    bgStyle = { backgroundImage: "none" };
  }

  return (
    <div className={messagesClassName} style={bgStyle}>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
