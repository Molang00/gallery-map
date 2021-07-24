import React, { useState } from 'react';
import axios from 'axios';
import './naverMapView.css';
import { useEffect } from 'react';
import Image from '../model/image';

const NaverMapView: React.FC = () => {
  const [centerLocation, setCenterLocation] = useState(
    new naver.maps.LatLng(36.555583405684345, 127.94091457139334),
  );
  const [mapBounds, setMapBounds] = useState({
    leftBottom: {
      lat: 0,
      lng: 0,
    },
    rightTop: {
      lat: 0,
      lng: 0,
    },
  });
  const [messages, setMessages] = useState([
    // "2020.06.30 Tue 😍 1st day",
    'test message',
    'test message2',
  ]);
  const [messageId, setMessageId] = useState(0);
  useEffect(() => {
    const tick = setInterval(() => {
      setMessageId((messageId + 1) % messages.length);
    }, 3000);

    return () => clearInterval(tick);
  }, [messageId]);

  const getCurrentLocation = () => {
    const success = position => {
      const { latitude, longitude } = position.coords;
      setCenterLocation(new naver.maps.LatLng(latitude, longitude));
      console.log(naverMap);
      naverMap?.setCenter(centerLocation);
      setMessages([
        ...messages,
        'currentLocation is ' +
          centerLocation.lat() +
          ',' +
          centerLocation.lng(),
      ]);
    };

    const error = () => {
      getCurrentLocationByIp();
    };

    const getCurrentLocationByIp = async () => {
      const response = await axios.post('https://geolocation-db.com/json/');
      console.log(response.data);
      const latitude = response.data.latitude;
      const longitude = response.data.longitude;
      setCenterLocation(new naver.maps.LatLng(latitude, longitude));
      console.log(naverMap);
      naverMap?.setCenter(centerLocation);
      messages.push(
        'currentLocation is ' +
          centerLocation.lat() +
          ',' +
          centerLocation.lng(),
      );
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  useEffect(() => {
    const initMap = () => {
      setNaverMap(
        new naver.maps.Map('react-naver-map', {
          center: centerLocation,
          zoom: 14,
          scaleControl: false,
          logoControl: true,
          logoControlOptions: {
            position: naver.maps.Position.LEFT_TOP,
          },
          mapDataControl: false,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: naver.maps.MapTypeControlStyle.BUTTON,
            position: naver.maps.Position.RIGHT_TOP,
          },
        }),
      );
    };
    initMap();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (naverMap != undefined) {
      naver.maps.Event.addListener(naverMap, 'dragend', function () {
        const bounds = naverMap.getBounds();
        setMapBounds({
          leftBottom: {
            lat: bounds.minY(),
            lng: bounds.minX(),
          },
          rightTop: {
            lat: bounds.maxY(),
            lng: bounds.maxX(),
          },
        });
      });
      naver.maps.Event.addListener(naverMap, 'zoom_changed', function () {
        const bounds = naverMap.getBounds();
        setMapBounds({
          leftBottom: {
            lat: bounds.minY(),
            lng: bounds.minX(),
          },
          rightTop: {
            lat: bounds.maxY(),
            lng: bounds.maxX(),
          },
        });
      });
    }
  }, [naverMap]);

  useEffect(() => {
    const setMapCenter = () => {
      if (naverMap != undefined) {
        naverMap.setCenter(centerLocation);
        console.log(centerLocation);

        // new naver.maps.Marker({
        //   position: new naver.maps.LatLng(
        //     37.55522222222222,
        //     126.94151388888888,
        //   ),
        //   map: naverMap,
        //   icon: {
        //     url:
        //       'http://127.0.0.1:3030' +
        //       '/resource/image/79921d105493a06d2a001067fa2c3d6680.jpg',
        //     size: new naver.maps.Size(150, 150),
        //     scaledSize: new naver.maps.Size(150, 150),
        //     origin: new naver.maps.Point(0, 0),
        //     anchor: new naver.maps.Point(75, 150),
        //   },
        // });
      }
    };
    setMapCenter();
    getImageListByView();
  }, [naverMap, centerLocation]);

  const baseUrl = 'http://127.0.0.1:3030';
  const createMarker = (image: Image) => {
    console.log(naverMap);
    console.log(image.width, image.height);
    const whRatio = image.width / (image.width + image.height);
    const meanSize = 200;
    const imgWidth = meanSize * (1 - whRatio);
    const imgHeight = meanSize * whRatio;
    console.log(whRatio);

    return new naver.maps.Marker({
      position: new naver.maps.LatLng(image.lat, image.lng),
      map: naverMap,
      icon: {
        url: baseUrl + '/resource/image/' + image.path,
        size: new naver.maps.Size(imgWidth, imgHeight),
        scaledSize: new naver.maps.Size(imgWidth, imgHeight),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(imgWidth / 2, imgHeight),
      },
    });
  };

  const getImageListByView = async () => {
    const endPoint = '/image/listByView';
    const params = {
      topLat: mapBounds.rightTop.lat,
      bottomLat: mapBounds.leftBottom.lat,
      leftLng: mapBounds.leftBottom.lng,
      rightLng: mapBounds.rightTop.lng,
    };
    const response = await axios.get(baseUrl + endPoint, {
      params: params,
    });
    console.log(response);
    setImages(response.data);
    response.data.map(it => {
      if (naverMap != undefined) {
        console.log('creating markers');
        const marker = createMarker(it);
        marker.setMap(naverMap);
      }
    });
  };

  const [images, setImages] = useState<Image[]>();
  useEffect(() => {
    getImageListByView();
  }, [mapBounds]);

  return (
    <React.Fragment>
      <div className="message">
        <div className="message-content">{messages[messageId]}</div>
      </div>
      <div id="react-naver-map"></div>
    </React.Fragment>
  );
};

export default NaverMapView;
