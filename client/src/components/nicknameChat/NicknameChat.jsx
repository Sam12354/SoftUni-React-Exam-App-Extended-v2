import { useState } from 'react';

export default function NicknameChat({ nickname, setNickname, onSave }) {
    const [error, setError] = useState('');

    const handleSave = () => {
        const trimmed = nickname.trim();
        if (!trimmed) return setError('Nickname is required');
        localStorage.setItem('nickname', trimmed);
        onSave();
    };

    return (
        <div style={{
            padding: 20,
            position: 'fixed',
            right: 20,
            bottom: 100,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            borderRadius: 8,
            zIndex: 1000
        }}>
            <h3>Enter your nickname</h3>
            <input
            // It updates the nickname state via setNickname
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="Your nickname"
                style={{ padding: 8, borderRadius: 4, border: 'none', marginBottom: 10, fontSize: 14 }}
            />
            {error && <div style={{ color: 'salmon', fontSize: 16 }}>{error}</div>}
            <button
                onClick={handleSave}
                style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
                Save
            </button>
        </div>
    );
}
