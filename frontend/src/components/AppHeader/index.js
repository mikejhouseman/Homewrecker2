import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Add this import
import ProfileButton from '../Navigation/ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logoImage from '../assets/homewreckerLogo.png';
import './AppHeader.css';

const AppHeader = () => {
  const authButtonsHidden = useSelector(state => state.ui.authButtonsHidden); // Get the authButtonsHidden state from Redux

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
      {!authButtonsHidden && ( // Only render the buttons if authButtonsHidden is false
        <div className="auth-buttons">
          <LoginFormModal />
          {/* Add the Sign Up button here */}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
