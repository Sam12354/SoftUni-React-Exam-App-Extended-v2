import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import NicknameChat from '../nicknameChat/NicknameChat';

const socket = io('http://localhost:7777');

export default function LiveChat() {
    // stores the actual nickname
    const [nickname, setNickname] = useState(localStorage.getItem('nickname') || '');
    // if the nickname has been confirmed or set
    const [isNicknameSet, setIsNicknameSet] = useState(!!nickname);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const [minimized, setMinimized] = useState(false);

    useEffect(() => {
        const handleMessage = (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        };
    
        socket.on('chat-message', handleMessage);
    
        return () => {
            socket.off('chat-message', handleMessage);
        };
    }, []);

    useEffect(() => {
        // optional chaining "?" — it safely checks if messagesEndRef.current exists before calling scrollIntoView()
        // scrollIntoView automatically scrows to the bottom so users aways see new msg
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
    
        const trimmed = input.trim();
        if (!trimmed) return;
    
        socket.emit('chat-message', { nickname, text: trimmed });
        setInput('');
    };


    if (!isNicknameSet) {
        return (
            <NicknameChat
                nickname={nickname}
                setNickname={setNickname}
                // Once the user saves their nickname in NicknameChat, mark isNicknameSet as true so we can stop showing the nickname input and show the chat box instead.
                onSave={() => setIsNicknameSet(true)}
            />
        ); 
    }

    return (
        <div style={{
            position: 'fixed',
            right: 20,
            bottom: 100,
            width: 300,
            height: minimized ? '40px' : '360px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: 'white',
            borderRadius: 8,
            padding: 10,
            fontSize: 14,
            zIndex: 1000,
            backdropFilter: 'blur(5px)',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
        }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontSize: 16 }}>Global Chat</h3>
                <button
                    onClick={() => setMinimized(!minimized)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '0 4px',
                        userSelect: 'none',
                    }}
                    aria-label={minimized ? 'Expand chat' : 'Minimize chat'}
                >
                    {minimized ? '▾' : '▴'}
                </button>
            </div>

            {!minimized && (
                <>
                    <div
                        style={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            paddingRight: 10,
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 6,
                            border: '1px solid rgba(255,255,255,0.2)',
                            marginBottom: 10,
                            maxHeight: 'calc(40vh - 80px)',
                        }}
                    >
                       
                        {messages.map((msg, i) => (
                            // for each message in messages array, create a div showing the sender's nickname and text
                            // Give each message a unique ID (by index) so React can track them correctly
                            <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                <strong>{msg.nickname}:</strong> {msg.text}
                            </div>
                        /* "messagesEndRef" Marks the bottom of the messages so we can scroll to it automatically */
                        ))}

                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={sendMessage} style={{ display: 'flex' }}>
                        <input
                            type="text"
                            placeholder="Type message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                flexGrow: 1,
                                padding: '8px',
                                borderRadius: 4,
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontSize: 14,
                                marginRight: 8,
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '8px 12px',
                                borderRadius: 4,
                                border: 'none',
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: 14,
                            }}
                        >
                            Send
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}
