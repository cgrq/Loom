import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import CTAButton from "../CTAButton";
import { logout } from "../../store/session";
import "./UserProfileNav.css"
import { getUserStorefrontThunk, setUserStorefront } from "../../store/storefronts";
import { resetProducts } from "../../store/products";

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
        dispatch(setUserStorefront({storefront:null}))
        dispatch(resetProducts())
        closeMenu();
        history.push('/');
    };

    const handleEditStorefront = (e) => {
        e.preventDefault();
        closeMenu();
        history.push(`/${user.username}/edit`);
    }
    return (
        <div className="nav-user-profile-nav">
            <div className={user ? "nav-upper-container" : "hidden"}>
                {user && (
                    <div className="nav-user-info-wrapper">
                        <div className="nav-user-img-edit-wrapper">
                            <img className="nav-user-img" onError={() => setImageUrl(process.env.PUBLIC_URL + "/default-profile-pic.png")} src={imageUrl}></img>
                        {user && !demoUserIds.includes(user.id) && (
                                <NavLink onClick={closeMenu} exact to="/edit-profile" activeClassName="active">
                                    Edit
                                </NavLink>

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
                                <NavLink onClick={closeMenu} exact to={`/${user.username}`} activeClassName="active">
                                    <CTAButton buttonText={"Visit storefront"} />
                                </NavLink>
                            </div>
                            : <NavLink onClick={closeMenu} exact to="/create-a-storefront" activeClassName="active">
                                <CTAButton buttonText={"Create your own storefront"} />
                            </NavLink>

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
          <a href="https://github.com/cgrq/Gather"><img src={process.env.PUBLIC_URL + "/github.png"}/></a>
          <a href="https://www.linkedin.com/in/cgrq/"><img src={process.env.PUBLIC_URL + "/linkedin.png"}/></a>
        </div>
            </div>
        </div>
    )
}
