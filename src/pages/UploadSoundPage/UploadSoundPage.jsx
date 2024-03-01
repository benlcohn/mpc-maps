import React, { useState, useRef } from "react";
import './UploadSoundPage.css'; // Import the CSS file
import * as soundsAPI from '../../utilities/sounds-api';

export default function UploadSoundPage() {
  const [fileInfo, setFileInfo] = useState([]); // State to hold information about each file (title, category)

  // Use a ref prop on the <input> in the JSX to
  // create a reference to the <input>, i.e.,
  // inputRef.current will be the <input> DOM element
  const fileInputRef = useRef();

  // EVENT HANDLERS

  const handleUpload = async () => {
    const formDataArray = []; // Array to hold FormData objects for each file

    // Loop through each file selected by the user
    for (let i = 0; i < fileInputRef.current.files.length; i++) {
      const file = fileInputRef.current.files[i];
      const { title, category } = fileInfo[i]; // Get title and category for the current file

      // Create a new FormData object for each file
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('sound', file);

      // Add the FormData object to the array
      formDataArray.push(formData);
    }

    try {
      // Upload all files simultaneously
      const promises = formDataArray.map(formData =>
        soundsAPI.upload(formData)
      );
      await Promise.all(promises);
      setFileInfo([]); // Clear fileInfo state after successful upload
      fileInputRef.current.value = ''; // Clear file input
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('File upload failed. Please try again.');
    }
  }

  // Function to handle change in title input for a specific file
  const handleTitleChange = (index, value) => {
    const updatedFileInfo = [...fileInfo];
    updatedFileInfo[index] = { ...updatedFileInfo[index], title: value };
    setFileInfo(updatedFileInfo);
  }

  // Function to handle change in category select for a specific file
  const handleCategoryChange = (index, value) => {
    const updatedFileInfo = [...fileInfo];
    updatedFileInfo[index] = { ...updatedFileInfo[index], category: value };
    setFileInfo(updatedFileInfo);
  }

  // Function to add file info for a new file
  // Function to add file info for a new file
// Function to add file info for a new file
const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length === 0) {
    return; // No files selected, do nothing
  }
  const newFilesInfo = Array.from(files).map((file) => {
    const fileName = file.name.slice(0, -4); // Remove file extension
    let defaultCategory = 'Boom'; // Default category
    // Try to match the file name with category keywords
    const keywords = ['Clap', 'HiHat', 'Kick', 'Ride', 'Snare', 'Tink', 'Tom'];
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
};



  return (
    <main className="UploadSoundPage">
      <section className="uploadContainer">
        <input type="file" ref={fileInputRef} multiple onChange={handleFileChange} />
        <button className="uploadButton" onClick={handleUpload}>Upload Sound</button>
      </section>
      <section className="fileContainer">
        {/* Generate input fields for titles and categories based on the fileInfo state */}
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
