import React, { useRef } from 'react';

interface SlotReelProps {
    symbol: string;
    delay: string;
}

const SlotReel: React.FC<SlotReelProps> = ({ symbol, delay }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const imageMap = {
        crown: '/crown.png',
        hourglass: '/hourglass.png',
        ring: '/ring.png',
        goblet: '/goblet.png',
        redGem: '/redGem.png',
        purpleGem: '/purpleGem.png',
        yellowGem: '/yellowGem.png',
        greenGem: '/greenGem.png',
        blueGem: '/blueGem.png',
        zeus: '/zeus.png',
    };

    const imageUrl = imageMap[symbol] || '/default.png';

    const handleAnimationEnd = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.2;
            audioRef.current.play();
        }
    };

    return (
        <div className="slot-reel">
            <img
                src={imageUrl}
                alt="slot symbol"
                onAnimationEnd={handleAnimationEnd}
                style={{
                    opacity: 0,
                    animation: `fall 0.25s ease-out forwards`,
                    animationDelay: delay,
                }}
            />
            <audio ref={audioRef} src="click.mp3" preload="auto" />
        </div>
    );
};

export default SlotReel;