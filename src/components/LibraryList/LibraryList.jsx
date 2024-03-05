import './LibraryList.css'
import React, { useState, useEffect } from 'react'; 
import LibraryListSound from '../LibraryListSound/LibraryListSound';
import * as soundsAPI from '../../utilities/sounds-api';

export default function LibraryList({ librarySounds }) {
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    setSounds(librarySounds); 
  }, [librarySounds]); 

  const handleDelete = async (soundId) => {
    try {
      await soundsAPI.removeSound(soundId);
      const updatedSounds = sounds.filter(sound => sound._id !== soundId);
      setSounds(updatedSounds);
    } catch (error) {
      console.error('Error deleting sound:', error);
    }
  };

  const soundComponents = sounds.map(sound =>
    <LibraryListSound
      key={sound._id}
      librarySound={sound}
      onDelete={handleDelete}
    />
  );

  return (
    <main className="LibraryList">
      {soundComponents}
    </main>
  );
}
