'use client'
import React, { useState, useEffect, useRef } from "react";
import UserProfileNav from "../UserProfileNav";
import "./ProfileButtonComponent.css";
import { NavLink } from "next/link";
import CTAButton from "../CTAButton";
import UserLoggedOutNav from "../UserLoggedOutNav";
import { getUserStorefrontThunk } from "../../store/storefronts";
import { useDispatch } from "react-redux";

function ProfileButtonComponent({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const profileListRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!profileListRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    const handleClickOutside = (e) => {
      closeMenu(e);
    };

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    dispatch(getUserStorefrontThunk());
  }, [showMenu]);

  return (
    <div className="profile-container">
      <button className="profile-icon-button clickable" onClick={openMenu}>
        <i className="fas fa-user-circle profile-icon" />
      </button>
      <div
        className={`${showMenu ? "" : "hidden"} profile-list`}
        ref={profileListRef}
      >
        {user ? <UserProfileNav user={user} closeMenu={closeMenu} /> : <UserLoggedOutNav />}
      </div>
    </div>
  );
}

export default ProfileButtonComponent;