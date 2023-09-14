'use client'
import React, { useState, useEffect, useRef } from "react";
import "./CartButtonComponent.css";
import { getUserStorefrontThunk } from "../../store/storefronts";
import { useDispatch } from "react-redux";
import CartList from "../CartList";
import UserLoggedOutNav from "../UserLoggedOutNav"

export default function CartButtonComponent({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const cartListRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!cartListRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    const handleClickOutside = (e) => {
      closeMenu(e);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(getUserStorefrontThunk());
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="cart-container">
      <button className="cart-icon-button clickable" onClick={openMenu}>
        <i className="fas fa-shopping-cart"></i>
      </button>
      <div
        className={`${showMenu ? "" : "hidden"} cart-list`}
        ref={cartListRef}
      >
        {user ? (
          <CartList />
        ) : (
          <div className="cart-logged-out-wrapper">
            Log in to add items to your cart
          </div>
        )}
      </div>
    </div>
  );
}