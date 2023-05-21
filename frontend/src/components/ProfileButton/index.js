import React, { useState, useEffect, useRef } from "react";
import UserProfileNav from "../UserProfileNav";
import "./ProfileButton.css";
import { NavLink } from "react-router-dom";
import CTAButton from "../CTAButton";
import UserLoggedOutNav from "../UserLoggedOutNav";
import { getUserStorefrontThunk } from "../../store/storefronts";
import { useDispatch } from "react-redux";

function ProfileButton({ user }) {
  // State for showing/hiding profile list dropdown
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);

  // Ref of
  const profileListRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);

  };

  useEffect(()=>{
    dispatch(getUserStorefrontThunk())
},[showMenu])

  useEffect(() => {
    if (!showMenu) return;


    const closeMenu = (e) => {
      if (!profileListRef.current.contains(e.target)) {
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
        className={`${(showMenu ? "" : "hidden ")
          } profile-list`}
        ref={profileListRef}
      >
        {
          user
            ? <UserProfileNav user={user} closeMenu={closeMenu} />
            : <UserLoggedOutNav />
        }
      </div>
    </div>
  );
}




export default ProfileButton;
