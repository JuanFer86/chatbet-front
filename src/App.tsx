import React, { useState } from "react";
import Chatbot from "./components/Chatbot";
import "./App.css";
import LoginModal from "./components/LoginModal";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-container">
      <Chatbot />

      <button className="login-btn" onClick={() => setIsModalOpen(true)}>
        Login
      </button>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
