import React, { useState, useEffect, useRef } from "react";
import "./ProfileButton.css";
import UserProfileNav from "../UserProfileNav";

function ProfileButton({ user }) {
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

  const closeMenu = () => {
    setShowMenu(false);
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
        <UserProfileNav user={user} closeMenu={closeMenu}/>
      </div>
    </div>
  );
}

export default ProfileButton;
