import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, editUser } from "../../store/session";
import "./UserAuthForm.css"

export default function UserAuthForm({ componentType }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const imageNotValid = (url) => {
    const errors = {};

    const isValidUrl = url.match(/.(jpg|jpeg|png)$/);
    if (!isValidUrl)
      errors.image = "image url must end in .jpg, .jpeg, or .png";

    const isTooLong = url.length > 500;
    if (isTooLong)
      errors.imageUrlLength = "image url must be less than 500 characters";

    return Object.values(errors).length > 0 ? errors : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword && !imageNotValid(profileImage)) {
      const data =
        componentType === "update"
          ? await dispatch(
              editUser(
                username,
                email,
                password,
                firstName,
                lastName,
                profileImage
              )
            )
          : await dispatch(
              signUp(
                username,
                email,
                password,
                firstName,
                lastName,
                profileImage
              )
            );
      if (data) {
        setErrors(data);
      } else {
        // closeModal();
      }
    } else {
      if (password !== confirmPassword) {
        setErrors({
          ...errors,
          password:
            "Confirm Password field must be the same as the Password field",
        });
      }
      if (imageNotValid(profileImage)) {
        setErrors({ ...errors, ...imageNotValid(profileImage) });
      }
    }
  };

  useEffect(() => {
    if (componentType === "update" && sessionUser) {
      setFirstName(sessionUser.first_name);
      setLastName(sessionUser.last_name);
      setEmail(sessionUser.email);
      setprofileImage(sessionUser.profile_image_url);
      setUsername(sessionUser.username);
    }
  }, [sessionUser]);

  return (
    <>
    <div>
      <h1 className="user-auth-form-h1">
        {componentType === "update" ? "Edit user" : "Sign up"}
      </h1>
      <form className="user-auth-form" onSubmit={handleSubmit}>
        {/* <ErrorHandler errors={errors} /> */}
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Profile Image</label>
          <input
            type="text"
            value={profileImage}
            onChange={(e) => setprofileImage(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className="user-auth-form-button" type="submit">
          {componentType === "update" ? "Edit user" : "Sign Up"}
        </button>
      </form>
    </div>
    </>
  );
}
