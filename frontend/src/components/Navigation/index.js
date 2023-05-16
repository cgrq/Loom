import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton"
import { useSelector } from "react-redux"
import CTAButton from "../CTAButton";
import "./Navigation.css"

export default function Navigation() {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className="navigation-content-wrapper">
            <NavLink exact to="/" activeClassName="active">home</NavLink>
            <input></input>
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
