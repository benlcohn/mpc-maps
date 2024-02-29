import { useState, useEffect } from 'react'
import './LibraryListSound.css';
import * as soundsAPI from '../../utilities/sounds-api'


export default function LibraryListSound({ librarySound }) {
    const [sounds, setSounds] = useState([]);
	const [playing, setPlaying] = useState(false);

    async function play() {
		setPlaying(true);
		new Audio(librarySound.url).play();

    }
    
    return (
        <div className="LibraryListSound">
            <div className="title">{librarySound.title}</div>
            <div className="play">
                <button className="btn" onClick={ () => play() } >
                ▶️
                </button>
            </div>
        </div>
    );
}