// frontend/src/components/Navigation/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import AddSpotFormModal from '../AddSpotFormModal';
import logoImage from '../Assets/homewreckerLogo.png';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const handleLogoClick = () => {
    window.location.replace('/'); // Force a page refresh and navigate to the home page
  };

  return (
    <ul>
      <div className='logo-container' onClick={handleLogoClick}>
        <Link to='/'>
          <img src={logoImage} alt='Homewrecker Logo' />
        </Link>
      </div>
      <div>
        {sessionUser && (
          <li>
              <OpenModalButton
                buttonText="Create a New Spot"
                modalComponent={<AddSpotFormModal />}
              />
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
      {isLoaded && (
        <li>
        <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
