import './DrumKit.css';
import { useState, useEffect } from 'react';

export default function DrumKit({ sound, letter, noSound, sounds, padLetters, masterVolume, pitch }) {
    const [playing, setPlaying] = useState(false);

    const padStyle = {
        backgroundColor: noSound ? "pink" : "purple",
    };

    // Function to play sound
    function play(sound) {
        if (!sound) return;
        setPlaying(true);
        const audio = new Audio(sound.url);
        audio.volume = masterVolume;
        audio.playbackRate = pitch;
        audio.play();

        setTimeout(() => {
            setPlaying(false);
        }, 150);
    };

    function handleKeyDown(evt) {
        const soundIdx = padLetters.indexOf(evt.key.toUpperCase());
        play(sounds[soundIdx]);
    };

    useEffect(() => {
        const handleKeyDownEvent = (event) => handleKeyDown(event);

        window.addEventListener('keydown', handleKeyDownEvent);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDownEvent);
        };
    }, []);

    return (
        <div
            className={`pad ${playing ? "playing" : ""}`}
            style={padStyle}
            onClick={() => play(sound)}
        >
            {letter}
        </div>
    );
}
