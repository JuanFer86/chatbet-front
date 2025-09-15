import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import "../styles/Chatbot.css";

interface Message {
  sender: "user" | "bot";
  message: string;
}

const Chatbot: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    setLoading(true);
    if (!input.trim()) return;

    let userData;
    let headers;
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      userData = JSON.parse(storedUser);
      headers = {
        Authorization: `Bearer ${userData.token}`,
        "x-user-key": userData.userKey,
        "x-user-id": userData.userId,
      };
    }

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", message: input },
    ];

    setMessages(newMessages);
    setInput("");

    console.log(headers);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", message: data.response },
      ]);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  // Auto scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <>
            {msg.sender ? (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
              />
            ) : (
              <></>
            )}
          </>
        ))}
        {loading && (
          <div className="loading-message">
            <ChatMessage sender="bot" message="..." />
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;
