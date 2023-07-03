import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import './Navigation.css'
import '../../index.css';

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (

      <div >
        <button onClick={openMenu}>
          <i class="fa-solid fa-users-line" id="user-button"></i>
        </button>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <div id="logged-button-wrapper">
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </div>
          ) : (
            <div id="login-button-wrapper">
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                className = "large-links"
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      </div>

  );
}

export default ProfileButton;
