import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link, useHistory } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const closeMenu = () => {
      setIsHovered(false);
    };

    document.addEventListener("mouseleave", closeMenu);

    return () => document.removeEventListener("mouseleave", closeMenu);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/events");
  };

  const ulClassName = "profile-dropdown" + (isHovered ? "" : " hidden");
  const closeMenu = () => setIsHovered(false);

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <i className="fas fa-user-circle" />
      </div>
      <ul className={ulClassName} ref={ulRef} onMouseLeave={handleMouseLeave}>
        {user ? (
          <>
            <li style={{"border-bottom": "1px"}}>User: {user.username}</li>
            {/* <li>{user.email}</li> */}
            <li>
              <Link to={`/events/current`}>Manage your events</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
