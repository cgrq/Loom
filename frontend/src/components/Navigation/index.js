import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton"
import { useDispatch, useSelector } from "react-redux"
import CTAButton from "../CTAButton";
import "./Navigation.css"
import { useEffect } from "react";
import { getUserStorefrontThunk } from "../../store/storefronts"
import { getStorefrontProductsThunk } from "../../store/products";

export default function Navigation() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.session);
    const { userStorefront } = useSelector((state) => state.storefronts)

    useEffect(() => {
        console.log("LOGGED IN")
        if(user){
            dispatch(getUserStorefrontThunk())
        }
    }, [user])

    // useEffect(() => {
    //     if (userStorefront && userStorefront.id) {
    //         dispatch(getStorefrontProductsThunk(userStorefront.id))
    //     }
    // }, [userStorefront])

    return (
        <div className="navigation-content-wrapper">
            <NavLink exact to="/" activeClassName="active">
                <img className="navigation-loom-logo" src={process.env.PUBLIC_URL + '/logo.png'} />
            </NavLink>
            <div className="navigation-buttons-wrapper">
                <div className="navigation-profile-buttons-wrapper">
                    <ProfileButton user={user} />
                </div>
                <div className="navigation-cart-wrapper">
                    <i className="fas fa-shopping-cart"></i>
                </div>
            </div>
        </div>
    )
}
