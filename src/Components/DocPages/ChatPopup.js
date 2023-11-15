import React, { useState } from 'react';
import './Chat.css'; // Add appropriate CSS styling for your chat pop-up
import Chat from './Chat'
function ChatPopup({ onClose }) {
    const [maximized, setMaximized] = useState(false);

    const toggleMaximize = () => {
        setMaximized(!maximized);
    };

    return (
        <div className={`chat-popup ${maximized ? 'maximized' : ''}`}>
            <div className="chat-header">
                <h2>Chat</h2>
                <button className="maximize-button" onClick={toggleMaximize}>
                    {maximized ? 'Minimize' : 'Maximize'}
                </button>
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
            <Chat/>
        </div>
    );
}

export default ChatPopup;
