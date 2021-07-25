import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../../config/api';

const Pictures: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInput = e => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePost = () => {
    const formData = new FormData();
    formData.append('image', selectedFile!);

    return axios
      .post(baseUrl + '/image/upload', formData)
      .then(res => {
        alert('성공' + res.data);
      })
      .catch(err => {
        alert('실패' + err);
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={handleFileInput} />
      <button type="button" onClick={handlePost}>
        upload image
      </button>
    </div>
  );
};

export default Pictures;
