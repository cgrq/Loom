import { NavLink } from "react-router-dom"
import CTAButton from "../CTAButton"
import "./UserLoggedOutNav.css"

export default function UserLoggedOutNav() {
  return (
    <div className="navigation-content-auth-wrapper">
      <div className="navigation-content-auth-buttons-wrapper">
        <NavLink exact to="/sign-up" activeClassName="active">
          <CTAButton buttonText={"Sign up"} />
        </NavLink>
        <NavLink exact to="/login" activeClassName="active">
          <CTAButton buttonText={"Login"} />
        </NavLink>
      </div>
      <div className="logged-out-social-links-wrapper">
        <a href="https://github.com/cgrq/Gather"><img src={process.env.PUBLIC_URL + "/github.png"} /></a>
        <a href="https://www.linkedin.com/in/cgrq/"><img src={process.env.PUBLIC_URL + "/linkedin.png"} /></a>
      </div>
    </div>
  )
}
