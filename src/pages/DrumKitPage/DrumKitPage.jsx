import { useState, useEffect } from 'react'
import './DrumKitPage.css'
import DrumKit from '../../components/DrumKit/DrumKit'
import * as soundsAPI from '../../utilities/sounds-api';

const PAD_LETTERS = [
	'1', '2', '3', '4', 
	'Q', 'W', 'E', 'R', 
	'A', 'S', 'D', 'F', 
	'Z', 'X', 'C', 'V'];

export default function DrumKitPage() {
	const [sounds, setSounds] = useState([]);
	const [playing, setPlaying] = useState(false);

	// Fetch existing uploaded sounds after first render
  	// Sounds will be sorted in the controller with the most recent first
  	useEffect(function() {
    	soundsAPI.getAll().then(sounds => setSounds(sounds));
  	}, []);

	useEffect(function() {
    	window.addEventListener('keydown', handleKeyDown);
		return function() {
			window.removeEventListener('keydown', handleKeyDown);
		}
  	}, []);

	function play(sound) {
		setPlaying(true);
		new Audio(sound.url).play();

		setTimeout(() => {
			setPlaying(false);
		}, 150);
	}

	function handleKeyDown(evt) {
		evt.preventDefault();
		const soundIdx = PAD_LETTERS.indexOf(evt.key.toUpperCase());
		console.log(sounds[soundIdx], sounds)
		// play(sounds[soundIdx]);
	}

	return (
		<div className="DrumKitPage">
			<h1>Drumkit</h1>
			<div className="drumkit">
				{sounds.map((sound, i) => (
					
					<DrumKit key={sound._id} sound={sound} letter={PAD_LETTERS[i]} play={play} playing={playing}/>
				))}
			</div>
		</div>
	);
}