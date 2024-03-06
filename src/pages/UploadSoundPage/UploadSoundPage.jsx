import React, { useState, useEffect, useRef } from "react";
import './UploadSoundPage.css';
import * as soundsAPI from '../../utilities/sounds-api';
import * as categoriesAPI from '../../utilities/categories-api';

export default function UploadSoundPage() {
  const [fileInfo, setFileInfo] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const fileInputRef = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
        const categories = await categoriesAPI.getAll();
        setCategories(categories);
    };
    fetchCategories();
  }, [])
  

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

  const handleFileChange = (evt) => {
    const files = evt.target.files;
    if (files.length === 0) {
      return;
    }

    const keywords = categories.map(category => category.name);

    const newFilesInfo = Array.from(files).map((file) => {
      let defaultCategory = 'Boom';
      const fileName = file.name.toLowerCase();
  
      const foundCategory = keywords.find(keyword => fileName.includes(keyword.toLowerCase()));
  

      const defaultTitle = `${file.name.charAt(0).toUpperCase()}${file.name.slice(1, -4)}`;

      return {
        title: defaultTitle,
        category: foundCategory || defaultCategory,
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
            />
            <select className="categorySelect" value={file.category} onChange={(evt) => handleCategoryChange(index, evt.target.value)}> 
              {categories && categories.map((category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        ))}
      </section>
    </main>
  );
}
