import React from 'react';
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';
import './naverMapView.css';

const NaverMapView: React.FC = () => {
  return (
    <React.Fragment>
      <div className="message">
        <div className="message-content">2020.06.30 Tue 😍 1st day</div>
      </div>
      <RenderAfterNavermapsLoaded clientId={'ik2vur2psa'}>
        <NaverMap
          defaultCenter={{ lat: 37.555583405684345, lng: 126.94091457139334 }}
          defaultZoom={14}
        />
      </RenderAfterNavermapsLoaded>
    </React.Fragment>
  );
};

export default NaverMapView;
