import { doc, onSnapshot, updateDoc, deleteField } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Avatar from "./Avatar"; // Import the new Avatar component

// SVG Icon for Delete
const DeleteIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

// Confirmation Modal Component
const ConfirmationModal = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p>{message}</p>
        <div className="confirm-modal-buttons">
          <button id="cancel-delete" onClick={onCancel}>Cancel</button>
          <button id="confirm-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch, data: chatData } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {}); // Ensure it's an object even if empty
      });
      return () => unsub();
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // --- Delete Chat Logic ---
  const openDeleteConfirm = (e, chatId) => {
    e.stopPropagation(); // Prevent chat selection
    setChatToDelete(chatId);
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setChatToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!chatToDelete) return;

    try {
      const userChatsRef = doc(db, "userChats", currentUser.uid);

      // Remove the chat from the user's chat list
      await updateDoc(userChatsRef, {
        [chatToDelete]: deleteField()
      });

      // If the deleted chat is the one currently open, reset the chat context
      if (chatData.chatId === chatToDelete) {
        dispatch({ type: "RESET_USER" });
      }

    } catch (err) {
      console.error("Error deleting chat:", err);
    } finally {
      handleCancelDelete();
    }
  };
  // --- End Delete Chat Logic ---

  // Sort chats by date
  const sortedChats = Object.entries(chats).sort((a, b) => b[1].date - a[1].date);

  return (
    <>
      <div className="chats">
        {sortedChats.map((chat) => (
          <div
            className={`userChat ${chat[0] === chatData.chatId ? "active" : ""}`}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            {/* Use the new Avatar component */}
            <Avatar user={chat[1].userInfo} size="medium" showStatus={true} />
            
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
            
            <button 
              className="delete-chat-button" 
              onClick={(e) => openDeleteConfirm(e, chat[0])}
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>

      <ConfirmationModal
        show={showConfirm}
        message="Are you sure you want to delete this chat?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Chats;