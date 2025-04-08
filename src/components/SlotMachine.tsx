import React, { useState, useEffect } from 'react';
import SlotReel from './SlotReel';
import SpinButton from './SpinButton';
import './SlotMachine.css';
import ChatBox from './ChatBox';
import { generateReelStops, calculatePayout, triggerFreeSpins } from './SlotLogic';

const betLevels = [0.5, 1, 2, 5, 10, 20, 50, 100];

const SlotMachine: React.FC = () => {
    const generateInitialReels = () => {
        const reelStops = generateReelStops(); 
        console.log("generateInitialReels - reelStops:", reelStops); // Log reelStops
        const reels: string[][] = [];
        for (let i = 0; i < 6; i++) {
            reels.push(reelStops.slice(i * 5, (i + 1) * 5));
        }
        console.log("generateInitialReels - reels:", reels); // Log reels
        return reels;
    };

    const [reels, setReels] = useState<string[][]>(generateInitialReels());
    const [balance, setBalance] = useState<number>(1000);
    const [spincostIndex, setSpincostIndex] = useState<number>(4);
    const spincost = betLevels[spincostIndex];
    const [spinCount, setSpinCount] = useState<number>(0);
    const [spinning, setSpinning] = useState<boolean>(false);
    const [background, setBackground] = useState<string>('');

    const spin = () => {
        if (balance < spincost) {
            alert('Not enough balance to spin!');
            return;
        }

        setSpinning(true);
        setBalance((prev) => prev - spincost);

        setTimeout(() => {
            const newReels = generateInitialReels();
            console.log("spin - newReels:", newReels); // Log newReels
            setReels(newReels);
            setSpinCount((prev) => prev + 1);
            setSpinning(false);

            const reelStops = newReels.flat();
            const payout = calculatePayout(reelStops);
            setBalance((prev) => prev + payout);

            if (triggerFreeSpins(reelStops)) {
                alert('Free Spins Triggered');
                // Pentru speciala mai tarziu
            }
        }, 500);
    };

    const increaseBet = () => {
        setSpincostIndex((prev) => Math.min(prev + 1, betLevels.length - 1));
    };

    const decreaseBet = () => {
        setSpincostIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div
            className="slot-machine-container"
            style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh' }}
        >
            <div className="slot-machine">
            <div className="reels-container">
                <div className="reels">
                    {reels.map((column, colIndex) => (
                        <div key={colIndex} className={`slot-reel-column ${spinning ? 'spinning' : ''}`}>
                            {column.map((symbol, rowIndex) => (
                                <SlotReel
                                    key={`${symbol}-${rowIndex}-${colIndex}-${spinCount}`}
                                    symbol={symbol}
                                    delay={`${colIndex * 0.2 + rowIndex * 0.1}s`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
              </div>
                <SpinButton onSpin={spin} />
            </div>

            <div className="controls">
                <div className="balance">
                    <p>Balance: ${balance.toFixed(2)}</p>
                </div>
                <div className="spin-cost">
                    <button onClick={decreaseBet}>-</button>
                    <p>Cost: ${spincost}</p>
                    <button onClick={increaseBet}>+</button>
                </div>
            </div>

            <ChatBox setBackground={setBackground} />
        </div>
    );
};

export default SlotMachine;