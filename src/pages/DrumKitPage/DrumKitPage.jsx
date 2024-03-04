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

//SELECT LAYOUT MAKE A BLANK SPOT IF YOU JUMP BACK TO IT AFTER SELECTING ANOTHER LAYOUT


export default function DrumKitPage() {
    const [sounds, setSounds] = useState([]);
    const [layouts, setLayouts] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState('65e54e003d8518c2b9d4753e');
    const [masterVolume, setMasterVolume] = useState(0.5);
    const [pitch, setPitch] = useState(1);

    // Fetch existing uploaded sounds after first render
    useEffect(() => {
        soundsAPI.getAll().then(sounds => setSounds(sounds));
    }, [])

    // Fetch existing layouts after first render
    useEffect(() => {
        layoutsAPI.getAll().then(layouts => setLayouts(layouts));
    }, [])


    // Function to handle layout selection
    function handleLayoutChange(evt) {
        const layoutId = evt.target.value;
        const selectedLayout = layouts.find(layout => layout._id === layoutId);
        setSelectedLayout(selectedLayout);
    }

    // Function to handle master volume
    const handleMasterVolumeChange = (volume) => {
        setMasterVolume(volume);
    }

    // Function to handle pitch
    const handlePitchChange = (pitch) => {
        setPitch(pitch);
    }

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
    }
	
    function handleKeyDown(evt) {
        const letter = evt.key.toUpperCase();
        play(selectedLayout[`pad${letter}`]);

        // const soundIdx = padLetters.indexOf(evt.key.toUpperCase());
        // if (soundIdx !== -1) {
			// play(sounds[soundIdx]);
			// } else {
				//     console.log("Key not mapped to any sound.");
				// }
	}
	
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, selectedLayout])


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
                        sound={selectedLayout[`pad${letter}`]}
                        letter={letter}
                        noSound={!selectedLayout[`pad${letter}`]}
                        play={play}
                        playing={playing}
                    />
                ))}
            </div>
        </div>
    );
}