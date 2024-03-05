import { useState } from 'react';
import './LibraryListSound.css';

export default function LibraryListSound({ librarySound, onDelete }) {
    const [playing, setPlaying] = useState(false);
  
    async function removeSound() {
      onDelete(librarySound._id); 
    }
  
    async function play() {
      setPlaying(true);
      new Audio(librarySound.url).play();
    }
  
    return (
      <div className="LibraryListSound">
        <div className="title">{librarySound.title}</div>
        <div className="play">
          <span onClick={removeSound}>❌</span>
          <span onClick={play}>▶️</span>
        </div>
      </div>
    );
  }
  