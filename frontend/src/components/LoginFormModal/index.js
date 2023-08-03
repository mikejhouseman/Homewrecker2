// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import { hideAuthButtons } from "../../store/ui";
import styles from "./LoginFormModal.module.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal, modalRef } = useModal();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const user = await dispatch(sessionActions.login({ credential, password }));
      if (!user.errors) {
        closeModal();
        dispatch(hideAuthButtons());
      } else {
        setErrors(user.errors);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleDemoLogin = async (e) => {
    setCredential("demo@user.io");
    setPassword("password");
    handleSubmit(e);
  };

  const isSubmitDisabled = credential.length < 4 || password.length < 6;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setCredential("");
        setPassword("");
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen, closeModal, modalRef]);

  return (
    <div>
      {!sessionUser && (
        <button className={styles.button} onClick={toggleModal}>
          Log In
        </button>
      )}
      {isModalOpen && !sessionUser && (
        <div className={styles["login-form-container"]} ref={modalRef}>
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username or Email
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.credential && <p>{errors.credential}</p>}
            <button type="submit" disabled={isSubmitDisabled} className={styles.button}>
              Log In
            </button>
          </form>
          <button onClick={handleDemoLogin} className={styles.button}>
            Log In as Demo User
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginFormModal;
