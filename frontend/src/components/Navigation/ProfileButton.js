// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones, faBars } from "@fortawesome/free-solid-svg-icons";
import "./ProfileButton.css";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";

const ProfileButton = () => {
  const dispatch = useDispatch();
  const ulRef = useRef();
  const containerRef = useRef();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  // useEffect for when user is loggedin or not
  useEffect(() => {
    const handleUserChange = () => {
      setShowMenu(false); // Close the menu when the login status changes
    };
    window.addEventListener("storage", handleUserChange);
    return () => {
      window.removeEventListener("storage", handleUserChange);
    };
  }, []);
// Menu dropdown functionality
  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!showMenu) {
        return; // Do nothing if the menu is already closed
      }
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        !e.target.classList.contains("manage-buttons")
      ) {
        closeMenu();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };
  const ulClassName = "profile-dropdown" + (showMenu ? " show" : ""); // Add "show" class to display the dropdown

  return (
    <div className="profile-button-container" ref={containerRef}>
      <button className="profile-button" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
        <FontAwesomeIcon icon={faSkullCrossbones} />
      </button>

      {showMenu && (
        <ul className={ulClassName} ref={ulRef}>
          {!sessionUser ? (
        // IF NOT LOGGED IN
            <div className="manage-buttons">
              <li>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </div>
          ) : (
        // IF LOGGED IN
            <div className="manage-buttons">
              <li>Hello, {sessionUser.firstName}</li>
              <li>{sessionUser.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              <li>
                <button>Manage Spots</button>
              </li>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};


export default ProfileButton;
