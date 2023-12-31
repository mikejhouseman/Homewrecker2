// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  const handleDemoLogin = async (e) => {
    setCredential("demo@user.io");
    setPassword("password");
    handleSubmit(e);
  };
  const isSubmitDisabled = credential.length < 4 || password.length < 6;

return (
  <>
    <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Username or email
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
      <button type="submit" disabled={isSubmitDisabled}>Log In</button>
    </form>
    <button onClick={handleDemoLogin} className="button">
    Log In as Demo User
    </button>
  </>
);
};
export default LoginFormModal;
