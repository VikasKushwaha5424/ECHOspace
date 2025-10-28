import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext"; // Import the theme provider

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    // FIX: Check for .uid to be sure the user object is loaded
    // This uses the updated AuthContext which merges Firebase data
    if (!currentUser?.uid) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              // CRITICAL FIX: Wrap ONLY the protected route (Home)
              // with the ThemeContextProvider.
              <ThemeContextProvider>
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </ThemeContextProvider>
            }
          />
          {/* Login and Register are now OUTSIDE the theme provider */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

