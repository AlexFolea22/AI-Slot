import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = ({ setBackground }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!input.trim()) {
            setError('Please enter a prompt.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/generate-image', { prompt: input });
            console.log('Full API response:', response.data);

            if (response.data.imageUrl) {
                // Set as background
                document.body.style.backgroundImage = `url(http://localhost:3001${response.data.imageUrl})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';
            } else {
                setError('Image data not found in the response.');
                console.error('Image data or mimeType not found in response.');
            }
        } catch (error) {
            setError('Failed to generate background. Please try again.');
            console.error('Error generating image:', error);
        }

        setLoading(false);
    };
    return (
        <div className="chat-box">
            <h2>Set Your Own Theme</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ex: Cyberpunk Tokyo"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Background'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ChatBox;