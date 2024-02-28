import { useState, useEffect } from 'react'
import './DrumKitPage.css'
import DrumKit from '../../components/DrumKit/DrumKit';
import * as soundsAPI from '../../utilities/sounds-api';

const PAD_LETTERS = ['1', '2', '3', '4', 'Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V']

export default function DrumKitPage() {
	const [sounds, setSounds] = useState([]);
	const [playing, setPlaying] = useState(false);

	// Fetch existing uploaded sounds after first render
  	// Sounds will be sorted in the controller with the most recent first
  	useEffect(function() {
    	soundsAPI.getAll().then(sounds => setSounds(sounds));
  	}, []);

	function play(evt) {
		setPlaying(true);

		new Audio(sound).play();

		setTimeout(() => {
			setPlaying(false);
		}, 150);
	};

	return (
		<div className="DrumKitPage" onKeyDown={play}>
			<h1>Drumkit</h1>
			<div className="drumkit">
				{sounds.map((sound, i) => (
					<DrumKit key={sound._id} sound={sound} letter={PAD_LETTERS[i]} play={play} playing={playing}/>
				))}
			</div>
		</div>
	);
}