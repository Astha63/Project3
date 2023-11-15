import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import axios from 'axios';

function Chat() {
    const username = localStorage.getItem('username');
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState({});
    const [recipientUsername, setRecipientUsername] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const chatContainerRef = useRef(null);
    const isChatHistoryEmpty = !chat[recipientUsername] || chat[recipientUsername].length === 0;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const formatMessageDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const fetchChatHistory = async (recipientUsername, senderUsername) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/chat/history/${recipientUsername}/${senderUsername}`);
            const chatHistory = response.data;

            // Update chat history for the selected recipient
            setChat((prevChat) => {
                const updatedChat = { ...prevChat };

                // Update recipient's chat
                if (!updatedChat[recipientUsername]) {
                    updatedChat[recipientUsername] = [];
                }
                chatHistory.forEach((messageData) => {
                    updatedChat[recipientUsername].push({
                        id: messageData.id,
                        message: messageData.message,
                        timestamp: messageData.timestamp,
                        sender: messageData.sender,
                    });
                });

                return updatedChat;
            });

            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/admin/all-users')
            .then((response) => {
                const allUsersData = response.data;
                setAllUsers(allUsersData);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });

        if (username) {
            const newSocket = new WebSocket(`ws://localhost:8000/ws/${username}`);

            newSocket.onopen = () => {
                console.log('WebSocket connected');
                setSocket(newSocket);
            };

            newSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Received message:', data);

                if (data.activeUsers) {
                    setActiveUsers(data.activeUsers);
                } else if (data.sender && data.message && data.recipientUsername) {
                    const updatedChat = { ...chat };
                    const sender = data.sender;
                    const recipient = data.recipientUsername;

                    // Update sender's chat
                    if (!updatedChat[sender]) {
                        updatedChat[sender] = [];
                    }
                    updatedChat[sender] = [
                        ...updatedChat[sender],
                        { id: data.id, message: data.message, timestamp: data.timestamp },
                    ];

                    // Update recipient's chat
                    if (!updatedChat[recipient]) {
                        updatedChat[recipient] = [];
                    }
                    updatedChat[recipient] = [
                        ...updatedChat[recipient],
                        { id: data.id, message: data.message, timestamp: data.timestamp },
                    ];

                    // Update current user's chat
                    if (!updatedChat[username]) {
                        updatedChat[username] = [];
                    }
                    updatedChat[username] = [
                        ...updatedChat[username],
                        { id: data.id, message: `You: ${data.message}`, timestamp: data.timestamp, sender: username },
                    ];

                    setChat(updatedChat);
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
            };


            newSocket.onclose = () => {
                console.log('WebSocket closed');
                // Reconnect logic here
                setTimeout(() => {
                    const newSocket = new WebSocket(`ws://localhost:8000/ws/${username}`);
                    newSocket.onopen = () => {
                        console.log('WebSocket reconnected');
                        setSocket(newSocket);
                    };
                    newSocket.onmessage = (event) => {
                        // ... (your existing code)
                    };
                    newSocket.onclose = () => {
                        console.log('WebSocket closed again');
                        // You can continue the reconnect logic as needed
                    };
                    newSocket.onerror = (error) => {
                        console.error('WebSocket Error:', error);
                    };
                }, 1000); // Wait for 1 second before attempting to reconnect
            };

            newSocket.onerror = (error) => {
                console.error('WebSocket Error:', error);
            };

            newSocket.onerror = (error) => {
                console.error('WebSocket Error:', error);
            };

            return () => {
                newSocket.close();
            };
        }
    }, [username]);

    const sortMessagesByTimestamp = (messages) => {
        return messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    };

    const renderMessages = (messages) => {
        const sortedMessages = sortMessagesByTimestamp(messages);
        const uniqueDates = new Set();

        return sortedMessages.map((messageData, index) => {
            const currentDate = formatMessageDate(messageData.timestamp);

            // Check if the current date is not in the set, then add it and show the date marker
            const showDateMarker = !uniqueDates.has(currentDate);
            uniqueDates.add(currentDate);

            return (
                <div key={index}>
                    {showDateMarker && (
                        <div className="date-marker">
                            {currentDate}
                        </div>
                    )}
                    <div className="message-container">
                        <div
                            className={`message ${messageData.sender === username ? 'sent' : 'received'}`}
                        >
                            {messageData.sender !== username && `${messageData.sender}: `}
                            {messageData.sender === username ? `You: ${messageData.message}` : messageData.message} - {formatTimestamp(messageData.timestamp)}
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleSendMessage = () => {
        if (socket && message && recipientUsername) {
            const isoTimestamp = new Date().toISOString();
            const dataToSend = {
                recipientUsername,
                message,
                sender: username,
                timestamp: isoTimestamp,
            };

            // Convert the timestamp to a string
            dataToSend.timestamp = dataToSend.timestamp.toString();

            socket.send(JSON.stringify(dataToSend));
            setMessage('');

            // Update chat for both sender and recipient
            setChat((prevChat) => {
                const updatedChat = { ...prevChat };

                // Update sender's chat
                if (!updatedChat[username]) {
                    updatedChat[username] = [];
                }

                // Update recipient's chat
                if (!updatedChat[recipientUsername]) {
                    updatedChat[recipientUsername] = [];
                }

                // Append the message for the sender
                updatedChat[username] = [
                    ...updatedChat[username],
                    { id: Date.now(), message: `You: ${message}`, timestamp: isoTimestamp, sender: username },
                ];

                // Append the message for the recipient
                updatedChat[recipientUsername] = [
                    ...updatedChat[recipientUsername],
                    { id: Date.now(), message, timestamp: isoTimestamp, sender: username },
                ];

                return updatedChat;
            });

            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            console.log('Sent message:', dataToSend);
        }
    };



    const sendPrivateMessage = (recipient) => {
        setRecipientUsername(recipient);
        console.log('Selected recipient:', recipient);

        // Check if chat history for the selected recipient already exists
        if (!chat[recipient]) {
            // Fetch chat history for the selected recipient only if it doesn't exist
            fetchChatHistory(recipient, username);
        }
    };


    return (
        <div className="App">
            <div className="sidebar">
                <div className="username-display">
                    <p className="custom-paragraph">Hii {username}</p>
                </div>

                <div className="active-users">
                    <h2>Active Users</h2>
                    <ul>
                        {activeUsers.map((user) => user !== username && (
                            <li key={user} onClick={() => sendPrivateMessage(user)}>
                                {user}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="all-users">
                    <h2>All Users</h2>
                    <ul>
                        {allUsers.map((user) => (
                            <li key={user.id} onClick={() => sendPrivateMessage(user.username)}>
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <h1>Doctors Space</h1>
            <div className="container">
                <div className="recipient-username">
                    {recipientUsername && !isChatHistoryEmpty
                        ? `Chatting with ${recipientUsername}`
                        : 'Start a new conversation'}
                </div>
                <div className="chat-container" ref={chatContainerRef}>
                    {recipientUsername && !isChatHistoryEmpty
                        ? renderMessages(chat[recipientUsername] || [])
                        : 'Start a new conversation!'}
                    {username &&
                        renderMessages(chat[username] || [])}
                </div>
                <div className="message-input">
                    <input
                        type="text"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;

