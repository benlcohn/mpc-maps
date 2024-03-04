import { useState, useEffect } from 'react';
import './DrumKitPage.css';
import DrumKit from '../../components/DrumKit/DrumKit';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import * as layoutsAPI from '../../utilities/layouts-api';
import * as soundsAPI from '../../utilities/sounds-api';

const PAD_LETTERS = [
    '1', '2', '3', '4',
    'Q', 'W', 'E', 'R',
    'A', 'S', 'D', 'F',
    'Z', 'X', 'C', 'V'
];

//SELECT LAYOUT MAKE A BLANK SPOT IF YOU JUMP BACK TO IT AFTER SELECTING ANOTHER LAYOUT


export default function DrumKitPage() {
    const [sounds, setSounds] = useState([]);
    const [layouts, setLayouts] = useState([]);
    const [selectedLayout, setSelectedLayout] = useState('65e54e003d8518c2b9d4753e');
    const [masterVolume, setMasterVolume] = useState(0.5);
    const [pitch, setPitch] = useState(1);

    // Fetch existing uploaded sounds after first render
    useEffect(() => {
        soundsAPI.getAll().then(sounds => setSounds(sounds));
    }, []);

    // Fetch existing layouts after first render
    useEffect(() => {
        layoutsAPI.getAll().then(layouts => setLayouts(layouts));
    }, []);


    // Function to handle layout selection
    function handleLayoutChange(evt) {
        const layoutId = evt.target.value;
        const selectedLayout = layouts.find(layout => layout._id === layoutId);
        setSelectedLayout(selectedLayout);
    }

    // Function to handle master volume
    const handleMasterVolumeChange = (volume) => {
        setMasterVolume(volume);
    };

    // Function to handle pitch
    const handlePitchChange = (pitch) => {
        setPitch(pitch);
    };


    return (
        <div className="DrumKitPage">
            <h1>Drumkit</h1>
            <ControlPanel onVolumeChange={handleMasterVolumeChange} onPitchChange={handlePitchChange} />
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
             <div className="drumkit">
                {selectedLayout && PAD_LETTERS.map((letter, i) => (
                    <DrumKit
                        key={i}
                        sound={selectedLayout[`pad${letter}`]}
                        letter={letter}
                        noSound={!selectedLayout[`pad${letter}`]}
                        padLetters={PAD_LETTERS}
                        sounds={sounds}
                        masterVolume={masterVolume}
                        pitch={pitch}
                    />
                ))}
            </div>
        </div>
    );
}