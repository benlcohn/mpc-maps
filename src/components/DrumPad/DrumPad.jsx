import './DrumPad.css';

export default function DrumPad({ sound, letter, noSound, play, playing }) {


    const padStyle = {
        backgroundColor: noSound ? "var(--blue)" : "var(--borange)",
    }

    return (
        <div
            className={`pad ${playing ? "playing" : ""}`}
            style={padStyle}
            onClick={() => play(sound)}
        >
            {letter}
        </div>
    );
}