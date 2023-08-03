// frontend/src/components/Appheader/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/homewreckerLogo.png';

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <Link to="/">
          <img src={logoImage} alt="Homewrecker Logo" />
        </Link>
      </div>
      <div className="app-name">Homewrecker</div>
      <div className="user-profile-icon">
        <ProfileButton />
      </div>
    </header>
  );
};

export default AppHeader;
