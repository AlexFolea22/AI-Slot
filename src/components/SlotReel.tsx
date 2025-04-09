import React, { useRef, useState, useEffect } from 'react';

interface SlotReelProps {
    symbol: string;
    delay: string;
    imageMap: Record<string, string>; 
}

const SlotReel: React.FC<SlotReelProps> = ({ symbol, delay, imageMap }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string>(() => {
        return imageMap[symbol] || '/default.png';
    });

    useEffect(() => {
        setCurrentImageUrl(imageMap[symbol] || '/default.png');
    }, [imageMap, symbol]);

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
                src={currentImageUrl}
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