'use client'
import { NavLink } from "next/link";
import ProfileButton from "../ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { Image } from 'next/image'; // Import the Image component
import "./NavigationComponent.css";
import { useEffect } from "react";
import { getUserStorefrontThunk } from "../../store/storefronts";
import { getStorefrontProductsThunk } from "../../store/products";
import CartButton from "../CartButton";
import { useRouter } from 'next/router';

export default function NavigationComponent() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.session);
    const { userStorefront } = useSelector((state) => state.storefronts);
    const router = useRouter();

    useEffect(() => {
        if(user){
            dispatch(getUserStorefrontThunk());
        }
    }, [user]);

    return (
        <div className="navigation-content-wrapper">
            <NavLink exact href="/" as="/" activeClassName="active">
                <Image alt="logo" src={process.env.PUBLIC_URL + '/logo.png'} /> {/* Replace <img> with <Image> */}
            </NavLink>
            <div className="navigation-buttons-wrapper">
                <div className="navigation-profile-buttons-wrapper">
                    <ProfileButton user={user} />
                </div>
                <div className="navigation-cart-wrapper">
                    <CartButton user={user} />
                </div>
            </div>
        </div>
    );
}