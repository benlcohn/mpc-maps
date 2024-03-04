import './DrumKit.css';
import { useState, useEffect } from 'react';

export default function DrumKit({ sound, letter, noSound, sounds, padLetters, masterVolume, pitch, selectedCategory }) {
    const [playing, setPlaying] = useState(true);
    const [useCategoryStyle, setUseCategoryStyle] = useState(false); // State to track whether to use category style

    // Function to get category color
    function getCategoryColor(category) {
        // Define category colors
        const categoryColors = {
            'Boom': 'blue',
            'Clap': 'green',
            'HiHat-Open': 'yellow',
            'HiHat-Closed': 'orange',
            // Add colors for other categories here
        };

        // Return color based on category
        return categoryColors[category] || "purple";
    }

    // Function to determine style based on state
    function getDisplayStyle() {
        if (useCategoryStyle && selectedCategory) {
            return {
                backgroundColor: getCategoryColor(selectedCategory),
            };
        } else {
            return {
                backgroundColor: noSound ? "pink" : "purple",
            };
        }
    }

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
            style={getDisplayStyle()} // Use the appropriate style based on the state
            onClick={() => play(sound)}
        >
            {letter}
        </div>
    );
}
