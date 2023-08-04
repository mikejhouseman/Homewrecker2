// frontend/src/components/LoginFormModal/index.js
// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  // const { closeModal, modalRef } = useModal();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // const sessionUser = useSelector((state) => state.session.user);

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

  // const isSubmitDisabled = credential.length < 4 || password.length < 6;


//   return (
//     <div>
//       {!sessionUser && (
//         <button className={styles.button} onClick={toggleModal}>
//           Log In
//         </button>
//       )}
//       {isModalOpen && !sessionUser && (
//         <div className={styles["login-form-container"]} ref={modalRef}>
//           <h1>Log In</h1>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Username or Email
//               <input
//                 type="text"
//                 value={credential}
//                 onChange={(e) => setCredential(e.target.value)}
//                 required
//               />
//             </label>
//             <label>
//               Password
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </label>
//             {errors.credential && <p>{errors.credential}</p>}
//             <button type="submit" disabled={isSubmitDisabled} className={styles.button}>
//               Log In
//             </button>
//           </form>
//           <button onClick={handleDemoLogin} className={styles.button}>
//             Log In as Demo User
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

return (
  <>
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
      <button type="submit">Log In</button>
    </form>
    <button onClick={handleDemoLogin} className="button">
    Log In as Demo User
    </button>
  </>
);
}
export default LoginFormModal;
