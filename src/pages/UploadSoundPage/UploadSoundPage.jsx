import { useState, useRef, useEffect } from "react";
import './UploadSoundPage.css';
import * as soundsAPI from '../../utilities/sounds-api';


export default function UploadSoundPage() {
// Create state to store file  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Boom');
  const [sounds, setSounds] = useState([]);
  // Use a ref prop on the <input> in the JSX to
  // create a reference to the <input>, i.e.,
  // inputRef.current will be the <input> DOM element
  const fileInputRef = useRef();

  // Fetch existing uploaded sounds after first render
  // Sounds will be sorted in the controller with the most recent first
  useEffect(function() {
    soundsAPI.getAll().then(sounds => setSounds(sounds));
  }, []);

  // EVENT HANDLERS

  async function handleUpload() {
    // Use FormData obj to send the inputs in the fetch request
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_a_file
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('sound', fileInputRef.current.files[0]);
    // DO I NEED MORE APPENDS?
    const newSound = await soundsAPI.upload(formData);
    setSounds([newSound, ...sounds]);
    //Clear file inputs
    setTitle('');
    fileInputRef.current.value = '';

  }

  return (
    <main className="UploadSoundPage flex-ctr-ctr">
      <section className="flex-ctr-ctr">
        <input type="file" ref={fileInputRef} />
        <input value={title} onChange={(evt) => setTitle(evt.target.value)} placeholder="Sound Title" />
        <select value={category} onChange={(evt) => setCategory(evt.target.value)}> 
          <option value='Boom'>Boom</option>
          <option value=''></option>
          <option value=''></option>
          <option value=''></option>
          <option value=''></option>
          <option value=''></option>
          <option value=''></option>
          <option value=''></option>
        </select>
        <button onClick={handleUpload}>Upload Sound</button>
      </section>
      <section>
        {/* {sounds.map(p => <SoundCard sound={s} key={s._id} />)} */}
      </section>
    </main>
  );
}
