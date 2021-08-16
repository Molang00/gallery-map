import React from 'react';
import Dropdown from 'react-dropdown';
import './gallery.css';
import 'react-dropdown/style.css';
import { Carousel } from 'react-bootstrap';

const Gallery: React.FC = () => {
  const options = ['one', 'two', 'three'];
  const defaultOption = options[0];

  return (
    <div>
      <div className="gallery-header">
        <h2 className="gallery-title">갤러리</h2>
        {/* <Button className="board-write" onClick={handleWriteBoard}>
        글쓰기
      </Button> */}
      </div>

      <div className="gallery-filter">
        <Dropdown
          className="gallery-city-filter"
          options={options}
          // onChange={() => {}}
          // value={defaultOption}
          placeholder="시/도"
        />
        <Dropdown
          className="gallery-gungu-filter"
          options={options}
          // onChange={() => {}}
          // value={defaultOption}
          placeholder="시/군/구"
        />
      </div>

      <Carousel className="image-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://192.168.35.107:3030/resource/image/741fceeff41c5d7b710a434ce7a7f583e.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://192.168.35.107:3030/resource/image/741fceeff41c5d7b710a434ce7a7f583e.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Gallery;
