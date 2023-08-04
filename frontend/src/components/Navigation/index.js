// frontend/src/components/Navigation/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logoImage from '../Assets/homewreckerLogo.png';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <div className='logo-container'>
        <Link to='/'>
          <img src={logoImage} alt='Homewrecker Logo' />
        </Link>
      </div>
      <div>
        {sessionUser && (
            <ProfileButton user={sessionUser} />
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
