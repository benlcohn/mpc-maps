import { useState, useEffect } from 'react';


export default function DrumKit({ sound, letter, play, playing }) {

	return (
		<div className={`pad ${playing ? "playing" : ""}`} onClick={play}>
			{letter}
			<br />
			{sound.title}
		</div>
	);
}