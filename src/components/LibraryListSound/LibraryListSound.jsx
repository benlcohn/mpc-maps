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
                <span onClick={play}>▶️</span>
            </div>
        </div>
    );
}