import React from 'react';
import Header from '../../componet/header/header';
import NaverMapView from '../../componet/map/naverMapView';
import './mainLayout.css';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <NaverMapView />
    </div>
  );
};

export default MainLayout;
