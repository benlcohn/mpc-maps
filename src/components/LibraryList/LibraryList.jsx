import './LibraryList.css';
import LibraryListSound from '../LibraryListSound/LibraryListSound';

export default function LibraryList({ librarySounds }) {
  const sounds = librarySounds.map(sound =>
    <LibraryListSound
      key={sound._id}
      librarySound={sound}
      url={sound.url}
    //   handleAddToKit={handleAddToKit}
    />
  );
  return (
    <main className="LibraryList">
      {sounds}
    </main>
  );
}