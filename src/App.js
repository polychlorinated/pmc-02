import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();

    formData.append('file', selectedFile);

    try {
      const response = await axios.post('<http://localhost:3000/upload>', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading the file');
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Document Upload</h1>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
