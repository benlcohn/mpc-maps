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
    const [selectedLayout, setSelectedLayout] = useState('65e54e003d8518c2b9d4753e');
    const [masterVolume, setMasterVolume] = useState(0.5);
    const [pitch, setPitch] = useState(1);
    const [preloadedSounds, setPreloadedSounds] = useState({});
    const [activePad, setActivePad] = useState(null);

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
                audio.load();
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

    function play(soundKey, letter) {
        const audio = preloadedSounds[soundKey];
        if (!audio) return;

        setActivePad(letter);
        audio.currentTime = 0;
        audio.volume = masterVolume;
        audio.playbackRate = pitch;
        audio.play();

        setTimeout(() => setActivePad(null), 150);
    }

    function handleKeyDown(evt) {
        const letter = evt.key.toUpperCase();
        play(`pad${letter}`, letter);
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
                <label>Select Layout:</label>
                &nbsp;
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
                            play={play}
                            activePad={activePad}
                        />
                    ))}
                </div>

            </div>
    );
}
