import { useState, useEffect } from 'react';

export default function DrumKit(props) {
	const [playing, setPlaying] = useState(false);
	const play = () => {
		setPlaying(true);

		new Audio(props.sound).play();

		setTimeout(() => {
			setPlaying(false);
		}, 100);
	};

	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (e.key.toLowerCase() === props.letter.toLowerCase()) {
				play();
			}
		});
	}, []);

	return (
		<div className={`pad ${playing ? "playing" : ""}`} onClick={play}>
			<div className="key">{props.letter}</div>
			<div className={props.name}></div>
			<div className={props.sound}></div>
		</div>
	);
}