import { useState, useEffect } from 'react';
import './DrumKitPage.css';
import DrumPad from '../../components/DrumPad/DrumPad';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import * as layoutsAPI from '../../utilities/layouts-api';
import * as soundsAPI from '../../utilities/sounds-api';

const PAD_LETTERS = [
    '1', '2', '3', '4',
    'Q', 'W', 'E', 'R',
    'A', 'S', 'D', 'F',
    'Z', 'X', 'C', 'V'
];

export default function DrumKitPage() {
    const [sounds, setSounds] = useState([]);
    const [layouts, setLayouts] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState('65e54e003d8518c2b9d4753e');
    const [masterVolume, setMasterVolume] = useState(0.5);
    const [pitch, setPitch] = useState(1);
    const [preloadedSounds, setPreloadedSounds] = useState({}); // State to store preloaded sounds

    useEffect(() => {
        soundsAPI.getAll().then(sounds => setSounds(sounds));
    }, []);

    useEffect(() => {
        layoutsAPI.getAll().then(layouts => setLayouts(layouts));
    }, []);

    useEffect(() => {
        const newPreloadedSounds = {};
        PAD_LETTERS.forEach(letter => {
            const sound = selectedLayout[`pad${letter}`];
            if (sound) {
                const audio = new Audio(sound.url);
                audio.load(); // Preload the sound
                newPreloadedSounds[`pad${letter}`] = audio;
            }
        });
        setPreloadedSounds(newPreloadedSounds);
    }, [selectedLayout]);

    function handleLayoutChange(evt) {
        const layoutId = evt.target.value;
        const selectedLayout = layouts.find(layout => layout._id === layoutId);
        setSelectedLayout(selectedLayout);
    }

    const handleMasterVolumeChange = (volume) => {
        setMasterVolume(volume);
    };

    const handlePitchChange = (pitch) => {
        setPitch(pitch);
    };

    function play(soundKey) {
        const audio = preloadedSounds[soundKey];
        if (!audio) return;

        setPlaying(true);
        audio.currentTime = 0; // Rewind to the start
        audio.volume = masterVolume;
        audio.playbackRate = pitch;
        audio.play();

        setTimeout(() => {
            setPlaying(false);
        }, 150);
    }

    function handleKeyDown(evt) {
        const letter = evt.key.toUpperCase();
        const soundKey = `pad${letter}`;
        play(soundKey);
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, selectedLayout, preloadedSounds]);

    return (
        <div className="DrumKitPage">
            <div className="layout-dropdown">
                <label htmlFor="layout-select">Select Layout:</label>
                <select id="layout-select" onChange={handleLayoutChange}>
                    <option value="">Select Layout</option>
                    {layouts.map(layout => (
                        <option key={layout._id} value={layout._id}>
                            {layout.title}
                        </option>
                    ))}
                </select>
            </div>
            <ControlPanel onVolumeChange={handleMasterVolumeChange} onPitchChange={handlePitchChange} />
            <div className="drumkit">
                {selectedLayout && PAD_LETTERS.map((letter, i) => (
                    <DrumPad
                        key={i}
                        sound={selectedLayout[`pad${letter}`]}
                        letter={letter}
                        noSound={!selectedLayout[`pad${letter}`]}
                        play={() => play(`pad${letter}`)}
                        playing={playing}
                    />
                ))}
            </div>
        </div>
    );
}
