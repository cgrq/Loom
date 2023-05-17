import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import "./ProfileButton.css";
import CTAButton from "../CTAButton";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const demoUserIds = [1, 2];

  const openMenu = () => {
    // console.log("profile button push -----------> ", showMenu)
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

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push('/');

  };

  return (
    <div className="profile-container">
      <button className="profile-icon-button clickable" onClick={openMenu}>
        <i className="fas fa-user-circle profile-icon" />
      </button>
      <div
        className={`${(showMenu ? "" : " hidden")
          } profile-list`}
        ref={ulRef}
      >
        <div className={user ? "nav-upper-container" : "hidden"}>
          {user && (
            <>
              <div className="nav-user-name-wrapper">
                <div>Hello, <span className="user-name">{user.first_name}</span></div>
                <div className="nav-user-email">{user.email}</div>
              </div>
              <img className="nav-user-img" src={user.profile_image_url}></img>
            </>
          )}
        </div>
        <div
          className={`nav-lower-container nav-links ${!user ? `nav-lower-container-logged-out` : ""
            }`}
        >
          <div>
            {user && !demoUserIds.includes(user.id) && (
              <NavLink onClick={closeMenu} exact to="/edit-profile" activeClassName="active">
                <CTAButton buttonText={"Edit"} />
              </NavLink>

            )}
            {demoUserIds.includes(user.id) && (
              <>
                <p className="demo-warning">*This demo user can't be edited/deleted</p>
              </>
            )}
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
