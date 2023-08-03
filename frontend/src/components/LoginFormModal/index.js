// frontend/src/components/LoginFormModal/index.js

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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

  // Disable the "Log In" button if username is less than 4 characters or password is less than 6 characters
  const isSubmitDisabled = credential.length < 4 || password.length < 6;

  return (
    <div id="login-form-container">
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
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" disabled={isSubmitDisabled}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
