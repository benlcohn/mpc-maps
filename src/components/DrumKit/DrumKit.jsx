export default function DrumKit({ sound, letter, play, playing }) {

	return (
		<div className={`pad ${playing ? "playing" : ""}`} onClick={() => play(sound)}>
			{letter}
		</div>
	);
}