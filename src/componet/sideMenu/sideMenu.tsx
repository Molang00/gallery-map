import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sideMenu.css';

const SideMenu: React.FC = () => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Map
      </a>

      {/* <a className="menu-item" href="/gallery">
        Gallery
      </a> */}

      <a className="menu-item" href="/upload">
        Upload
      </a>

      <a className="menu-item" href="/board">
        Board
      </a>

      <a className="menu-item" href="/contact">
        Contact
      </a>
      <div className="created-by">
        created by
        <p className="creator">byeongsu kim</p>
      </div>
    </Menu>
  );
};

export default SideMenu;
