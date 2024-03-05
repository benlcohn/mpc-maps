import React, { useState, useRef } from "react";
import './UploadSoundPage.css';
import * as soundsAPI from '../../utilities/sounds-api';

export default function UploadSoundPage() {
  const [fileInfo, setFileInfo] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");

  const fileInputRef = useRef();

  const handleUpload = async () => {
    try {
      const formDataArray = []; 

      if (fileInputRef.current.files.length === 0) {
        setUploadMessage('No files selected');
        setTimeout(() => setUploadMessage(''), 2000);
        return;
      }
  
      for (let i = 0; i < fileInputRef.current.files.length; i++) {
        const file = fileInputRef.current.files[i];
        let { title, category } = fileInfo[i];

        if (!title) {
          title = `${file.name.charAt(0).toUpperCase()}${file.name.slice(1, -4)}`;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('sound', file);

        formDataArray.push(formData);
      }
  
      const promises = formDataArray.map(formData =>
        soundsAPI.uploadSound(formData)
      );
      await Promise.all(promises);
  
      setFileInfo([]); 
      fileInputRef.current.value = ''; 

      setUploadMessage('Files uploaded successfully!');
      setTimeout(() => setUploadMessage(''), 2000); 
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadMessage('File upload failed. Please try again.');
      setTimeout(() => setUploadMessage(''), 2000);
    }
  }  

  const handleTitleChange = (index, value) => {
    const updatedFileInfo = [...fileInfo];
    updatedFileInfo[index] = { ...updatedFileInfo[index], title: value };
    setFileInfo(updatedFileInfo);
  }

  const handleCategoryChange = (index, value) => {
    const updatedFileInfo = [...fileInfo];
    updatedFileInfo[index] = { ...updatedFileInfo[index], category: value };
    setFileInfo(updatedFileInfo);
  }

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }
    const newFilesInfo = Array.from(files).map((file) => {
      let defaultCategory = 'Boom';
      const keywords = ['Clap', 'HiHat', 'Kick', 'Ride', 'Snare', 'Tink', 'Tom'];
      const fileName = file.name;
      keywords.forEach(keyword => {
        if (fileName.toLowerCase().includes(keyword.toLowerCase())) {
          defaultCategory = keyword;
        }
      });
      return {
        title: '',
        category: defaultCategory,
        file,
      };
    });
    setFileInfo([...fileInfo, ...newFilesInfo]);
  }

  return (
    <main className="UploadSoundPage">
      <section className="upload-container">
        <input type="file" ref={fileInputRef} multiple onChange={handleFileChange} />
        <button className="uploadButton" onClick={handleUpload}>{uploadMessage ? uploadMessage : 'SAVE AUDIO'}</button>
      </section>
      <section className="fileContainer">
        {fileInfo.map((file, index) => (
          <div key={index} className="fileDiv">
            <input 
              className="titleInput" 
              value={file.title} 
              onChange={(evt) => handleTitleChange(index, evt.target.value)} 
              placeholder={`Rename '${fileInputRef.current.files[index].name.charAt(0).toUpperCase()}${fileInputRef.current.files[index].name.slice(1, -4)}'`} />
            <select className="categorySelect" value={file.category} onChange={(evt) => handleCategoryChange(index, evt.target.value)}> 
              <option value='Boom'>Boom</option>
              <option value='Clap'>Clap</option>
              <option value='HiHat-Open'>HiHat-Open</option>
              <option value='HiHat-Closed'>HiHat-Closed</option>
              <option value='Kick'>Kick</option>
              <option value='Ride'>Ride</option>
              <option value='Snare'>Snare</option>
              <option value='Tink'>Tink</option>
              <option value='Tom-High'>Tom-High</option>
              <option value='Tom-Low'>Tom-Low</option>
              <option value='Tom-Mid'>Tom-Mid</option>
            </select>
          </div>
        ))}
      </section>
    </main>
  );
}
