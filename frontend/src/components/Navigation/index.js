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
    const sessionUser = useSelector((state) => state.session.user);
    const { userStorefront } = useSelector((state) => state.storefronts)

    useEffect(() => {
        dispatch(getUserStorefrontThunk())
    }, [])

    useEffect(()=>{
        dispatch(getStorefrontProductsThunk(userStorefront.id))
    }, [userStorefront])

    return (
        <div className="navigation-content-wrapper">
            <NavLink exact to="/" activeClassName="active">home</NavLink>
            <div className="navigation-buttons-wrapper">
                {
                    sessionUser
                        ?
                        <ProfileButton user={sessionUser} />
                        :
                        <div>
                            <NavLink exact to="/sign-up" activeClassName="active">
                                <CTAButton buttonText={"Sign up"} />
                            </NavLink>
                            <NavLink exact to="/login" activeClassName="active">
                                <CTAButton buttonText={"Login"} />
                            </NavLink>
                        </div>
                }
                <div>Cart</div>
            </div>
        </div>
    )
}
