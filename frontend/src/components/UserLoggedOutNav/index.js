import Link from 'next/link';
import CTAButton from "../CTAButton";
import Image from 'next/image';
import avatar from './lee.png';
import "./UserLoggedOutNav.css";

export default function UserLoggedOutNav() {
  return (
    <div className="navigation-content-auth-wrapper">
      <div className="navigation-content-auth-buttons-wrapper">
        <Link href="/sign-up" passHref>
          <CTAButton buttonText={"Sign up"} />
        </Link>
        <Link href="/login" passHref>
          <CTAButton buttonText={"Login"} />
        </Link>
      </div>
      <div className="logged-out-social-links-wrapper">
        <a href="https://github.com/cgrq/Gather">
          <Image alt="GitHub" src={process.env.PUBLIC_URL + "/github.png"} />
        </a>
        <a href="https://www.linkedin.com/in/cgrq/">
          <Image alt="LinkedIn" src={process.env.PUBLIC_URL + "/linkedin.png"} />
        </a>
      </div>
    </div>
  )
}