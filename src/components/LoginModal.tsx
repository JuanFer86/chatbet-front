import React, { useState } from "react";
import "../styles/LoginModal.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [userKey, setUserKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!userKey.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userkey: userKey }),
      });

      if (!response.ok) {
        setError("failed to log in, try again later");
        return;
      }

      const data = await response.json();

      sessionStorage.setItem("user", JSON.stringify(data));

      setUserKey("");
      onClose();
    } catch (error) {
      console.log(error);
      setError("failed to log in, try again later");
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="UserKey"
            value={userKey}
            onChange={(e) => setUserKey(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: loading ? "#707070" : "" }}
          >
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginModal;
