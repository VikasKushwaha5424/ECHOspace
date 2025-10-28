import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { ThemeContextProvider } from './context/ThemeContext'; // Import new provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <ThemeContextProvider> {/* Wrap the app */}
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);