// frontend/src/components/Appheader/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logoImage from '../assets/homewreckerLogo.png';
import './AppHeader.css';

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
      <div className="login-button">
        <LoginFormModal />
      </div>
    </header>
  );
};

export default AppHeader;
