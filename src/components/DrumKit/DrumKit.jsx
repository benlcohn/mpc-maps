import './DrumKit.css';
import { useState, useEffect } from 'react';

export default function DrumKit({ sound, letter, play, noSound, sounds, padLetters }) {
	const [playing, setPlaying] = useState(false);

	const padStyle = {
        backgroundColor: noSound ? "pink" : "purple",
    };

	// Function to play sound
	function play(sound) {
		if (!sound) return;
		setPlaying(true);
		new Audio(sound.url).play();

		setTimeout(() => {
			setPlaying(false);
		}, 150);
	};

	function handleKeyDown(evt) {
		const soundIdx = padLetters.indexOf(evt.key.toUpperCase());
		play(sounds[soundIdx]);
	};

	useEffect(function() {
    	window.addEventListener('keydown', handleKeyDown);
		return function() {
			window.removeEventListener('keydown', handleKeyDown);
		}
  	}, [handleKeyDown]);

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