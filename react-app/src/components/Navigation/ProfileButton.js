import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link, useHistory, NavLink } from "react-router-dom";
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
        style={{ "fontWeight": "bold" }}
        onMouseLeave={handleMouseLeave}
      >
        <i className="fas fa-user-circle" />
        &nbsp;
        {user.email}
        &nbsp;
        <i className="arrow-down fa-solid fa-chevron-down"></i>
      </div>
      <ul className={ulClassName} ref={ulRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {user ? (
          <>
            <li style={{ "borderBottom": "1px lightgray solid" }}><span style={{ "fontWeight": "bold" }}>Username:</span> {user.username}</li>
            {/* <li>{user.email}</li> */}
            <li>
              <Link to={`/events/current`}>Manage your Events</Link>
            </li>
            <li style={{ borderBottom: "1px solid lightgray" }}>
              <Link to={`/genres/create`}>View/Create Genres</Link>
            </li>
            <li className="button-dropdown">
              <Link to="/events/new">Create an event</Link>
            </li>
            <li className="button-dropdown">
              <Link to="/current_user/likes" style={{ "text-decoration": "none" }}>Likes</Link>
            </li>
            <li className="button-dropdown">
              <Link to="/current_user/tickets">Tickets</Link>
            </li>
            <li>
              <button onClick={handleLogout} id="logOut-button">Log Out</button>
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
