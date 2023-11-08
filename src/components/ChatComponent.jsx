import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sender = '654645195449baba812e2b6e';
  const recipient = '65465b5f691d714653d6baef';
  const socket = io(import.meta.env.VITE_BACKEND_URL); // Replace with your server URL

  useEffect(() => {
    // Fetch chat history from the server
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/history/${sender}/${recipient}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error('Error fetching chat history:', error);
      });
  }, [sender, recipient]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (newMessage) => {
      console.log(newMessage)
      // Add the new message to the messages state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    // Send a chat message
    socket.emit('chat message', {message, sender, recipient});
    setMessage(''); // Clear the input field after sending
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender.name}:</strong> {msg.message}
        </li>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;