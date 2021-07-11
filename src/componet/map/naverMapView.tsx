import React, { useState } from 'react';
import axios from 'axios';
import './naverMapView.css';
import { useEffect } from 'react';

const NaverMapView: React.FC = () => {
  const [centerLocation, setCenterLocation] = useState(
    new naver.maps.LatLng(36.555583405684345, 127.94091457139334),
  );
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
        'currentLocation is ' + centerLocation.lat + ',' + centerLocation.lng,
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
        'currentLocation is ' + centerLocation.lat + ',' + centerLocation.lng,
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
    const setMapCenter = () => {
      if (naverMap != undefined) {
        naverMap.setCenter(centerLocation);
        console.log(centerLocation);

        new naver.maps.Marker({
          position: centerLocation,
          map: naverMap,
        });
      }
    };
    setMapCenter();
  }, [naverMap, centerLocation]);

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
