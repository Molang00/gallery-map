import React, { useState } from 'react';
import axios from 'axios';
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';
import './naverMapView.css';
import { useEffect } from 'react';

const NaverMapView: React.FC = () => {
  const [initLocation, setInitLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 36.555583405684345,
    lng: 127.94091457139334,
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
      setCurrentLocation({
        lat: latitude,
        lng: longitude,
      });
      setInitLocation(true);
      setMessages([
        ...messages,
        'currentLocation is ' + currentLocation.lat + ',' + currentLocation.lng,
      ]);
    };

    const error = () => {
      getCurrentLocationByIp();
    };

    const getCurrentLocationByIp = async () => {
      const response = await axios.post('https://geolocation-db.com/json/');
      console.log(response.data);
      setCurrentLocation({
        lat: response.data.latitude,
        lng: response.data.longitude,
      });
      setInitLocation(true);
      messages.push(
        'currentLocation is ' + currentLocation.lat + ',' + currentLocation.lng,
      );
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  if (initLocation == false) getCurrentLocation();

  return (
    <React.Fragment>
      <div className="message">
        <div className="message-content">{messages[messageId]}</div>
      </div>
      <RenderAfterNavermapsLoaded clientId={'ik2vur2psa'}>
        <NaverMap center={currentLocation} defaultZoom={14} />
      </RenderAfterNavermapsLoaded>
    </React.Fragment>
  );
};

export default NaverMapView;
