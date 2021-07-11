import React from 'react';
import Header from '../../componet/header/header';
import Routes from '../../route';
import './mainLayout.css';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
};

export default MainLayout;
