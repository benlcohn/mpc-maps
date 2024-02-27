import { useState } from 'react'
import './DrumKitPage.css'
import DrumKit from '../../components/DrumKit/DrumKit';
import boom from '../../sounds/boom.wav'

export default function DrumKitPage() {
	const [sounds] = useState([
		{
			name: "boom",
			sound: "https://mpc-maps-bucket.s3.us-west-1.amazonaws.com/boom.wav",
			key: "A",
		},
		{
			name: "clap",
			sound: "https://mpc-maps-bucket.s3.us-west-1.amazonaws.com/boom.wav",
			key: "S",
		},
		{
			name: "",
			sound: "",
			key: "D",
		},
		{
			name: "",
			sound: "",
			key: "F",
		},
		{
			name: "",
			sound: "",
			key: "G",
		},
		{
			name: "",
			sound: "",
			key: "H",
		},
		{
			name: "",
			sound: "",
			key: "J",
		},
		{
			name: "",
			sound: "",
			key: "K",
		},
		{
			name: "",
			sound:"",
			key: "L",
		},
	]);

	return (
		<div className="DrumKitPage">
			<h1>Drumkit</h1>
			<div className="drumkit">
				{sounds.map((sound, i) => (
					<DrumKit key={i} name={sound.name} letter={sound.key} sound={sound.sound} />
				))}
			</div>
		</div>
	);
}