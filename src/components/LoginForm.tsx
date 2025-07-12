import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "staff@clinic.com" && password === "123456") {
      localStorage.setItem("loggedIn", "true");
      navigate("/calendar");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full sm:w-96 p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Clinic Staff Login
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full p-4 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
