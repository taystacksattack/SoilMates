import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory()

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
        history.push('/feed')
        closeModal()
    }
  };

  const demoUser1 = async (e) => {
    const data = await dispatch(login("demo@aa.io", "password"))
    history.push('/feed')
    closeModal()
  }

  const demoUser2 = async (e) => {
    const data = await dispatch(login("marnie@aa.io", "password"))
    history.push('/feed')
    closeModal()
  }

  return (
    <>
    <div id="login-modal-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div id="login-form-wrapper">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx} className="errors-info">{error}</li>
            ))}
          </ul>
          <label>

            <input
              className="input-field"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>

            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        <div id="signup-button-wrapper">
          <button type="submit">Log In</button>

        </div>
        </div>
      </form>
      <div id="demo-button-wrapper">
        <button onClick={e => demoUser1()} id="demo-user-buttons"> Log in as Demo User </button>
        <button onClick={e => demoUser2()} id="demo-user-buttons"> Log in as Marnie </button>
      </div>
    </div>
    </>
  );
}

export default LoginFormModal;
