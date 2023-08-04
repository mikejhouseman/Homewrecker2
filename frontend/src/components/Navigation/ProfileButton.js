// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones, faBars } from "@fortawesome/free-solid-svg-icons";
import "./ProfileButton.css";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

const ProfileButton = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const containerRef = useRef();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!containerRef.current || !ulRef.current) {
        return;
      }

      if (
        !containerRef.current.contains(e.target) &&
        !ulRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
            <>
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
            </>
          ) : (
            <>
              <li>Hello, {sessionUser.firstName}</li>
              <li>{sessionUser.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              <li>
                <button className="manage-button">Manage Spots</button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
