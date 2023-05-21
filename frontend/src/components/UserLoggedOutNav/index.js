import { NavLink } from "react-router-dom"
import CTAButton from "../CTAButton"
import "./UserLoggedOutNav.css"

export default function UserLoggedOutNav(){
    return (
        <div className="navigation-content-auth-buttons-wrapper">
                <NavLink exact to="/sign-up" activeClassName="active">
                  <CTAButton buttonText={"Sign up"} />
                </NavLink>
                <NavLink exact to="/login" activeClassName="active">
                  <CTAButton buttonText={"Login"} />
                </NavLink>
              </div>
    )
}
