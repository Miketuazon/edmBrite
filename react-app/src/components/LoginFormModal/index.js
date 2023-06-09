import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoSignIn = async (e) => {
    e.preventDefault();
    const password = "password"
    const email = "demo@aa.io"
    const demoData = await dispatch(login(email, password));
    if (demoData) {
      setErrors(demoData);
    } else {
      closeModal();
    }
  }

  return (
    <div className="logIn">
      <div className="loginPhotoContainer">
        <img className="loginPhoto" src="https://edm.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY0NTQ2MTkyMDc4ODA4ODQx/valentino-khan-by-scott-witt---lollapalooza-2018.jpg">
        </img>
      </div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="button-container">
        <button type="submit">Log In</button>
        <button onClick={demoSignIn} className="demo-sign-in-button" id='demo-user-button'>
          Demo User
        </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
