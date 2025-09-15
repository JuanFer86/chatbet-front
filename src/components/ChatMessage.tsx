import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import "../styles/ChatMessage.css";

interface ChatMessageProps {
  sender: "user" | "bot";
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = memo(({ sender, message }) => {
  return (
    <div className={`chat-message ${sender}`}>
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  );
});

export default ChatMessage;
