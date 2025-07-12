import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import CalendarPage from "./pages/Calendar";

function App() {
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={loggedIn ? "/calendar" : "/login"} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/calendar" element={loggedIn ? <CalendarPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
