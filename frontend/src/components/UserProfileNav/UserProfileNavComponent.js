'use client'
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import Link from 'next/link';
import CTAButton from "../CTAButton";
import { logout } from "../../store/session";
import "./UserProfileNavComponent.css"
import { getUserStorefrontThunk, setUserStorefront } from "../../store/storefronts";
import { resetProducts } from "../../store/products";
import Image from 'next/image';

export default function UserProfileNavComponent({ user, closeMenu }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { userStorefront } = useSelector((state) => state.storefronts)
    const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL + "/default-profile-pic.png")

    const demoUserIds = [1, 2];

    useEffect(() => {
        if (user.profile_image) {
            setImageUrl(user.profile_image)
        }
    }, [user])

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        dispatch(setUserStorefront({storefront:null}))
        dispatch(resetProducts())
        closeMenu();
        router.push('/');
    };

    const handleEditStorefront = (e) => {
        e.preventDefault();
        closeMenu();
        router.push(`/${user.username}/edit`);
    }

    return (
        <div className="nav-user-profile-nav">
            <div className={user ? "nav-upper-container" : "hidden"}>
                {user && (
                    <div className="nav-user-info-wrapper">
                        <div className="nav-user-img-edit-wrapper">
                            <Image className="nav-user-img" onError={() => setImageUrl(process.env.PUBLIC_URL + "/default-profile-pic.png")} src={imageUrl} alt="User Profile Image"></Image>
                        {user && !demoUserIds.includes(user.id) && (
                                <Link onClick={closeMenu} href="/edit-profile" activeClassName="active">
                                    Edit
                                </Link>

                            )}
                            </div>
                        <div className="nav-user-details-wrapper">
                            <div className="nav-user-name-wrapper">
                                <span>Hello,</span>
                                <span className="nav-user-name">{user.first_name}</span>
                            </div>
                            <div className="nav-user-email">{user.email}</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="nav-lower-container">
                <div className="nav-lower-content-container">
                    <div className="nav-storefront-outer-container">
                    {
                        userStorefront
                            ? <div className="nav-storefront-container">
                                <div className="nav-storefront-title-wrapper">
                                    <h2>Storefront</h2>
                                    <div className="nav-storefront-edit-wrapper" onClick={handleEditStorefront}>Edit</div>
                                </div>
                                <Link onClick={closeMenu} href={`/${user.username}`} activeClassName="active">
                                    <CTAButton buttonText={"Visit storefront"} />
                                </Link>
                            </div>
                            : <Link onClick={closeMenu} href="/create-a-storefront" activeClassName="active">
                                <CTAButton buttonText={"Create your own storefront"} />
                            </Link>

                    }
                    </div>
                    <div
                        className={` nav-links ${!user ? `nav-lower-container-logged-out` : ""
                            }`}
                    >
                        <div>

                            {demoUserIds.includes(user.id) && (
                                <>
                                    <p className="demo-warning">*This demo user can't be edited/deleted</p>
                                </>
                            )}
                                    <CTAButton buttonText={"Log Out"} onClick={handleLogout} warningButton={true}/>

                        </div>

                    </div>

                </div>
                <div className="nav-social-links-wrapper">
          <a href="https://github.com/cgrq/Gather"><Image src={process.env.PUBLIC_URL + "/github.png"} alt="Github Logo"/></a>
          <a href="https://www.linkedin.com/in/cgrq/"><Image src={process.env.PUBLIC_URL + "/linkedin.png"} alt="LinkedIn Logo"/></a>
        </div>
            </div>
        </div>
    )
}