// frontend/src/components/AppHeader/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logoImage from '../assets/homewreckerLogo.png';
import { hideAuthButtons, showAuthButtons } from '../../store/ui';
import { useModal } from '../../context/Modal';
import './AppHeader.css';

const AppHeader = () => {
  const authButtonsHidden = useSelector(state => state.ui.authButtonsHidden);
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const toggleModal = () => {
    closeModal();
    if (authButtonsHidden) {
      dispatch(showAuthButtons());
    } else {
      dispatch(hideAuthButtons());
    }
  };

  return (
    <header className='app-header'>
      <div className='logo-container'>
        <Link to='/'>
          <img src={logoImage} alt='Homewrecker Logo' />
        </Link>
      </div>
      <div className='app-name'>Homewrecker</div>
      <div className='user-profile-icon'>
        {sessionUser ? (
          <>
            <ProfileButton user={sessionUser} />
          </>
        ) : (
          <>
            {!authButtonsHidden && (
              <LoginFormModal onClick={toggleModal} />
            )}
            {!authButtonsHidden && (
              <SignupFormModal onClick={toggleModal} />
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
