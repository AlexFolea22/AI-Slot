import React, { useRef, useState, useEffect } from 'react';

interface SlotReelProps {
    symbol: string;
    delay: string;
    imageMap: Record<string, string>;
    className?: string;
    maxDelay: number;
}

const SlotReel: React.FC<SlotReelProps> = ({ symbol, delay, imageMap, className, maxDelay }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioRefPulse = useRef<HTMLAudioElement>(null);

    const [currentImageUrl, setCurrentImageUrl] = useState<string>(() => {
        return imageMap[symbol] || '/default.png';
    });
    const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>({
        opacity: 0,
        animation: `fall 0.25s ease-out forwards`,
        animationDelay: delay,
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

        if (className === "animated-symbol") {
            const pulseDelay = maxDelay - parseFloat(delay); 

            setTimeout(() => {
                if (audioRefPulse.current) {
                    audioRefPulse.current.currentTime = 0;
                    audioRefPulse.current.volume = 0.01;
                    audioRefPulse.current.play(); 
                }
            }, pulseDelay * 1000); 
            setAnimationStyle((prev) => ({
                ...prev,
                opacity: 1,
                animation: `pulse 1s ${pulseDelay}s infinite alternate`,
            }));
        } else {
            setAnimationStyle((prev) => ({
                ...prev,
                opacity: 1,
            }));
        }
    };

    return (
        <div className="slot-reel">
            <img
                src={currentImageUrl}
                alt="slot symbol"
                onAnimationEnd={handleAnimationEnd}
                style={animationStyle}
                className={className}
            />
            <audio ref={audioRef} src="glitt.mp3" preload="auto" />
            <audio ref={audioRefPulse} src="shine.mp3" preload="auto" />
        </div>
    );
};

export default SlotReel;