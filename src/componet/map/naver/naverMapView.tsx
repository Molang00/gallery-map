import React, { useState } from 'react';
import axios from 'axios';
import './naverMapView.css';
import { useEffect } from 'react';
import Image from '../model/image';
import { baseUrl, imageBaseUrl } from '../../../config/api';
import EventMessageView from '../eventMessage/eventMessageView';

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
  const setMapBoundsByNaverMap = () => {
    const bounds = naverMap?.getBounds();
    if (bounds != undefined) {
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
    }
  };

  const getCurrentLocation = () => {
    const success = position => {
      const { latitude, longitude } = position.coords;
      setCenterLocation(new naver.maps.LatLng(latitude, longitude));
      naverMap?.setCenter(centerLocation);
    };

    const error = () => {
      getCurrentLocationByIp();
    };

    const getCurrentLocationByIp = async () => {
      const response = await axios.post('https://geolocation-db.com/json/');
      const latitude = response.data.latitude;
      const longitude = response.data.longitude;
      setCenterLocation(new naver.maps.LatLng(latitude, longitude));
      naverMap?.setCenter(centerLocation);
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
  }, []);

  useEffect(() => {
    getCurrentLocation();
    if (naverMap != undefined) {
      naver.maps.Event.addListener(naverMap, 'dragend', function () {
        setMapBoundsByNaverMap();
      });
      naver.maps.Event.addListener(naverMap, 'zoom_changed', function () {
        setMapBoundsByNaverMap();
      });
    }
  }, [naverMap]);

  useEffect(() => {
    const setMapCenter = () => {
      if (naverMap != undefined) {
        naverMap.setCenter(centerLocation);
      }
    };
    setMapCenter();
    setMapBoundsByNaverMap();
  }, [naverMap, centerLocation]);

  const createMarker = (image: Image) => {
    const whRatio = image.width / (image.width + image.height);
    const meanSize = 500;
    const imgWidth = meanSize * whRatio;
    const imgHeight = meanSize * (1 - whRatio);

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(image.lat, image.lng),
      map: naverMap,
      icon: {
        url: './pin_blue.png',
      },
    });
    const imageSrc = imageBaseUrl + image.path;

    const contentString = [
      '<div class="infowindow" onClick>',
      ' <a href="',
      imageSrc,
      '" download>',
      ' <img  width="',
      imgWidth,
      '" height="',
      imgHeight,
      ' "',
      '      src="',
      imageSrc,
      '"',
      '    />',
      ' </a>',
      '</div>',
    ].join('');
    const infowindow = new naver.maps.InfoWindow({
      content: contentString,
    });
    naver.maps.Event.addListener(marker, 'click', () => {
      if (infowindow.getMap()) {
        infowindow.close();
      } else if (naverMap != undefined) {
        infowindow.open(naverMap, marker);
      }
    });

    return marker;
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
        const marker = createMarker(it);
        marker.setMap(naverMap);
      }
    });
  };

  const [, setImages] = useState<Image[]>();
  useEffect(() => {
    getImageListByView();
  }, [mapBounds]);

  return (
    <React.Fragment>
      <EventMessageView />
      <div id="react-naver-map"></div>
    </React.Fragment>
  );
};

export default NaverMapView;
