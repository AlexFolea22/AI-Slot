import React, { useState } from 'react';
import axios from 'axios';

interface ImageUrls {
    blueGemUrl: string | null;
    redGemUrl: string | null;
    yellowGemUrl: string | null;
    purpleGemUrl: string | null;
    greenGemUrl: string | null;
    zeusUrl: string | null;
    crownUrl: string | null;
    hourglassUrl: string | null;
    ringUrl: string | null;
    gobletUrl: string | null;
}

const ChatBox = ({ setBackground, setImageUrls }) => { 
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
            //Background Image
            const backgroundResponse = await axios.post('http://localhost:3001/background', { prompt: input });
            if (backgroundResponse.data.imageUrl) {
                document.body.style.backgroundImage = `url(http://localhost:3001${backgroundResponse.data.imageUrl})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';
            } else {
                setError('Background image data not found in the response.');
            }

            //All symbols
            const newImageUrls: ImageUrls = {
                blueGemUrl: null,
                redGemUrl: null,
                yellowGemUrl: null,
                purpleGemUrl: null,
                greenGemUrl: null,
                zeusUrl: null,
                crownUrl: null,
                hourglassUrl: null,
                ringUrl: null,
                gobletUrl: null,
            };

            const promises = Object.keys(newImageUrls).map(async (symbol) => {
                if(symbol==='zeusUrl'){
                    const response = await axios.post(`http://localhost:3001/${symbol.replace('Url', '')}`, { prompt: input });
                    if (response.data.imageUrl) {
                        newImageUrls[symbol] = `http://localhost:3001${response.data.imageUrl}`;
                    } else {
                        setError(`${symbol.replace('Url', '')} image data not found in the response.`);
                    }
                } else{
                    const response = await axios.post(`http://localhost:3001/${symbol.replace('Url', '')}`, { prompt: input });
                    if (response.data.imageUrl) {
                        newImageUrls[symbol] = `http://localhost:3001${response.data.imageUrl}`;
                    } else {
                        setError(`${symbol.replace('Url', '')} image data not found in the response.`);
                    }
                }

            });

            await Promise.all(promises);
            setImageUrls(newImageUrls); 

        } catch (error) {
            setError('Failed to generate images. Please try again.');
        } finally {
            setLoading(false);
            setInput("");
        }
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
                    {loading ? 'Generating...' : 'Generate Images'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ChatBox;