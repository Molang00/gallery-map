import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../../config/api';
import ImageUploader from 'react-images-upload';
import { Button } from 'react-bootstrap';

const Upload: React.FC = () => {
  const [pictures, setPictures] = useState<File[]>([]);

  const onDrop = (files: File[]) => {
    setPictures(files);
    console.log(files);
  };

  const removePictures = (fileName: string[]) => {
    setPictures(
      pictures.filter(picture => {
        return fileName.find(name => name === picture.name) == undefined;
      }),
    );
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
        console.log(res.data);
        if (res.data.success != 0) {
          alert(
            '업로드 완료\n성공: ' + res.data.success + '/' + res.data.total,
          );
          // removePictures(
          //   res.data.imageList.map(image => image.originalFileName),
          // );
        } else {
          alert('업로드 실패');
        }
      })
      .catch(err => {
        alert('업로드 실패\n' + err);
      });
  };

  const [flag, setFlag] = useState(false);
  return (
    <div>
      <ImageUploader
        withIcon={true}
        onChange={onDrop}
        withLabel={true}
        withPreview={true}
        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
        maxFileSize={10000000}
      />
      <Button variant="dark" onClick={handlePost}>
        upload images
      </Button>
    </div>
  );
};

export default Upload;
