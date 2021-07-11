import React from 'react';
import './header.css';
import SideMenu from '../sideMenu/sideMenu';

const Header: React.FC = () => {
  return (
    <div className="header">
      <SideMenu />
      <div className="title">Gallery Map</div>
    </div>
  );
};

export default Header;
