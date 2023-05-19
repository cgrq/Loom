import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import CTAButton from "../CTAButton";
import { logout } from "../../store/session";
import "./UserProfileNav.css"

export default function UserProfileNav({ user, closeMenu }) {
    const history = useHistory();
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
        closeMenu();
        history.push('/');
    };

    const handleEditStorefront = (e) =>{
        e.preventDefault();
        closeMenu();
        history.push('/storefront/edit');
    }
    return (
        <>
            <div className={user ? "nav-upper-container" : "hidden"}>
                {user && (
                    <div className="nav-user-info-wrapper">
                        <img className="nav-user-img" onError={() => setImageUrl(process.env.PUBLIC_URL + "/default-image.png")} src={imageUrl}></img>
                        <div className="nav-user-name-wrapper">
                            <div>Hello, <span className="nav-user-name">{user.first_name}</span></div>
                            <div className="nav-user-email">{user.email}</div>
                        </div>
                    </div>
                )}
            </div>
            {
                userStorefront
                ? <div className="nav-storefront-container">
                    <div className="nav-storefront-title-wrapper">
                        <h2>Your Storefront</h2>
                        <button onClick={handleEditStorefront}>Edit</button>
                    </div>
                    <NavLink onClick={closeMenu} exact to="/storefront" activeClassName="active">
                    <CTAButton buttonText={"Visit storefront"} />
                </NavLink>
                </div>
                :<NavLink onClick={closeMenu} exact to="/storefront" activeClassName="active">
                    <CTAButton buttonText={"Create storefront"} />
                </NavLink>

            }
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
        </>
    )
}
