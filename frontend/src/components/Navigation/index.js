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
        if(userStorefront && userStorefront.id){
            dispatch(getStorefrontProductsThunk(userStorefront.id))
        }
    }, [userStorefront])

    return (
        <div className="navigation-content-wrapper">
            <NavLink exact to="/" activeClassName="active">
                <img className="navigation-loom-logo" src={process.env.PUBLIC_URL + '/logo.png'} />
            </NavLink>
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
                <div className="navigation-cart-wrapper">
                    <i class="fas fa-shopping-cart"></i>
                </div>
            </div>
        </div>
    )
}
