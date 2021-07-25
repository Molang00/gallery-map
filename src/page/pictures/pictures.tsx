import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../../config/api';
import ImageUploader from 'react-images-upload';
import { Button, CloseButton, ListGroup } from 'react-bootstrap';

const Pictures: React.FC = () => {
  const [pictures, setPictures] = useState<File[]>([]);

  const onDrop = (files: File[]) => {
    setPictures([...files]);
  };

  const handlePost = () => {
    const formData = new FormData();
    console.log(pictures);
    if (pictures.length < 1) {
      alert('이미지를 선택해주세요.');
      return;
    }
    pictures.map(picture => formData.append('image', picture));

    return axios
      .post(baseUrl + '/image/upload/list', formData)
      .then(res => {
        alert('성공');
        console.log(res.data);
      })
      .catch(err => {
        alert('실패' + err);
      });
  };

  return (
    <div>
      <Button variant="dark" onClick={handlePost}>
        upload images
      </Button>
      <ImageUploader
        withIcon={true}
        onChange={onDrop}
        withLabel={true}
        withPreview={true}
        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
        maxFileSize={10000000}
      />
    </div>
  );
};

export default Pictures;
