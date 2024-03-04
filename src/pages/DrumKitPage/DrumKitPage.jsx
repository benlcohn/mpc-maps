import { useState, useEffect } from 'react';
import './DrumKitPage.css';
import DrumKit from '../../components/DrumKit/DrumKit';
import * as layoutsAPI from '../../utilities/layouts-api'; // Import layouts API
import * as soundsAPI from '../../utilities/sounds-api'; // Sound API

const PAD_LETTERS = [
    '1', '2', '3', '4',
    'Q', 'W', 'E', 'R',
    'A', 'S', 'D', 'F',
    'Z', 'X', 'C', 'V'
];

export default function DrumKitPage() {
    const [sounds, setSounds] = useState([]);
    const [layouts, setLayouts] = useState([]); // State for layouts
    const [selectedLayout, setSelectedLayout] = useState(null); // State for selected layout

    // Fetch existing uploaded sounds after first render
    useEffect(() => {
        soundsAPI.getAll().then(sounds => setSounds(sounds));
    }, []);

    // Fetch existing layouts after first render
    useEffect(() => {
        layoutsAPI.getAll().then(layouts => setLayouts(layouts));
    }, []);


    // Function to handle layout selection
    function handleLayoutChange(event) {
        const layoutId = event.target.value;
        const selectedLayout = layouts.find(layout => layout._id === layoutId);
        setSelectedLayout(selectedLayout);
    }

	// Define a default layout object with all pads set to non-null sound
	const defaultLayout = {
		_id: 'default', // Add an identifier for the default layout
		title: 'Default Layout', // Title for default layout
		...PAD_LETTERS.reduce((acc, letter) => {
			acc[`pad${letter}`] = sounds[0]; // Set all pads to the first sound in the sounds array
			return acc;
		}, {})
	};

	// Set the default layout as the initial selected layout
	useEffect(() => {
		if (layouts.length > 0) {
			setSelectedLayout(defaultLayout);
		}
	}, [layouts]);

    return (
        <div className="DrumKitPage">
            <h1>Drumkit</h1>
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
				
                    />
                ))}
            </div>
        </div>
    );
}
