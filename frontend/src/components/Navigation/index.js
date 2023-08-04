// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logoImage from '../Assets/homewreckerLogo.png';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
        {/* show manage spots, add spots */}
      </li>
    );
  } else {
    sessionLinks = (
      <li>
          <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <ul>
      <div className='logo-container'>
        <Link to='/'>
          <img src={logoImage} alt='Homewrecker Logo' />
        </Link>
      </div>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
