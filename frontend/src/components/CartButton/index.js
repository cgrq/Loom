import React, { useState, useEffect, useRef } from "react";
import UserProfileNav from "../UserProfileNav";
import "./CartButton.css";
import { NavLink } from "react-router-dom";
import CTAButton from "../CTAButton";
import UserLoggedOutNav from "../UserLoggedOutNav";
import { getUserStorefrontThunk } from "../../store/storefronts";
import { useDispatch } from "react-redux";
import CartItem from "../CartList";

export default function CartButton({ user }) {
  // State for showing/hiding cart list dropdown
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);

  // Ref of
  const cartListRef = useRef();

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
      if (!cartListRef.current.contains(e.target)) {
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
    <div className="cart-container">
      <button className="cart-icon-button clickable" onClick={openMenu}>
        <i className="fas fa-shopping-cart"></i>
      </button>
      <div
        className={`${(showMenu ? "" : "hidden ")
          } cart-list`}
        ref={cartListRef}
      >
        {
           <CartItem />
        }
      </div>
    </div>
  );
}
