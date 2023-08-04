// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import "./ProfileButton.css";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (showMenu) {
      const handleOutsideClick = (e) => {
        if (!ulRef.current || !ulRef.current.contains(e.target)) {
          closeMenu();
        }
      };
      document.addEventListener("click", handleOutsideClick);

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-button-container">
      <button className="profile-button" onClick={openMenu}>
        <FontAwesomeIcon icon={faSkullCrossbones} />
      </button>

      {!sessionUser && (
        <ul className={ulClassName} ref={ulRef}>
          <li>
            <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
            />
          </li>
            <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
            />
        </ul>
      )}

      {sessionUser && (
        <ul className={ulClassName} ref={ulRef}>
          <li>Hello, {user.firstName}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
          <li>
            <a href="/user/spots">ManageSpots</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
