import { useState, useEffect } from 'react';
import './DrumPad.css';

export default function DrumPad({ sound, letter, noSound, play, activePad }) {
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (letter === activePad) {
            setPlaying(true);
            setTimeout(() => setPlaying(false), 150);
        }
    }, [activePad, letter]);

    const padStyle = {
        backgroundColor: noSound ? "var(--blue)" : "var(--red)",
    };

    return (
        <div
            className={`pad ${playing ? "playing" : ""}`}
            style={padStyle}
            onClick={() => play(`pad${letter}`, letter)}
        >
            <div className="kit-letter">{letter}</div>
            <br></br>
            <div className="kit-title">{sound?.title.length > 10 ? `${sound.title.slice(0, 10)}...` : sound?.title}</div>
        </div>
    );
}
