import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);
 



  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }

    const message = {
      content: newMessage,
      timestamp: new Date().getTime(),
      sender: "user",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const getTimeLabel = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);

    if (
      today.getDate() === messageDate.getDate() &&
      today.getMonth() === messageDate.getMonth() &&
      today.getFullYear() === messageDate.getFullYear()
    ) {
      return "Today";
    }

    // Format the date as per your preference
    return messageDate.toDateString();
  };


  return (
    <div className="chat-container" >
      <div className="header">
        <div className="profile-picture">
          <img src="logo512.png" alt="Recipient Profile" />
        </div>
        <div className="recipient-name">
          <p className="profile-name">Recipient Name</p>
          <p className="comeback-time">we will back online at 09:00 am</p>
        </div>
      </div>
      <div className="chat-window"  >
        <div className="chat-time">
          {messages.length > 0 && <div className="line"></div>}
          {messages.length > 0 && (
            <div className="time-label">
              {getTimeLabel(messages[0].timestamp)}
            </div>
          )}
          {messages.length > 0 && <div className="line"></div>}
        </div>

        <div className="question">
          <p className="question-content">
            Hi, <br />
            Quick question... What kinds of tasks the Sidekiq processes?
          </p>
        </div>

        {messages.map((message, index) => (
          <div ref={messagesEndRef} key={index} className={`message ${message.sender}`} id="sender">
            {message.sender === "user" && (
              <div className="sender-profile-picture">
                <img src="logo512.png" alt="Recipient Profile" />
              </div>
            )}
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <Input
          fullWidth
          label="fullWidth"
          id="fullWidth"
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Write answer ..."
        />

        <IconButton aria-label="Icons" size="small">
          <SentimentSatisfiedAltIcon />
        </IconButton>
        <button onClick={handleSendMessage}>
          <IconButton aria-label="Send" size="small">
            <SendOutlinedIcon />
          </IconButton>
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
