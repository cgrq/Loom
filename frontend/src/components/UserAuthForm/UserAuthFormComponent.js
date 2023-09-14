'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, editUser, deleteUser } from "../../store/session";
import { useRouter } from 'next/router';
import Link from 'next/link';
import "react-datepicker/dist/react-datepicker.css";
import DemoUserButton from "../DemoUserButton";
import FormWrapperComponent from "../FormWrapperComponent";
import DeleteButton from "../DeleteButton";
import InputField from "../InputField";
import ImageField from "../ImageField";

export default function UserAuthFormComponent({ componentType }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { userStorefront } = useSelector((state) => state.storefronts);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [startStorefront, setStartStorefront] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (componentType === "update" && sessionUser) {
      setFirstName(sessionUser.first_name);
      setLastName(sessionUser.last_name);
      setEmail(sessionUser.email);
      setProfileImage(sessionUser.profile_image);
      setUsername(sessionUser.username);
    }
  }, [componentType, sessionUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("profileImage", profileImage);

      const data =
        componentType === "update"
          ? await dispatch(editUser(formData))
          : await dispatch(signUp(formData));

      if (data) {
        setErrors(data);
      } else {
        if (startStorefront) {
          router.push('/create-a-storefront');
        } else {
          router.push('/');
        }
      }
    } else {
      setErrors({
        ...errors,
        password: "Password fields must match",
      });
    }
  };

  return (
    <>
      <FormWrapperComponent
        title={componentType === "update" ? "Edit profile details" : "Create a profile"}
        onSubmit={handleSubmit}
        submitButtonText={componentType === "update" ? "Update Profile" : "Create Profile"}
        lowerComponent={() => (
          componentType === "update" ? (
            <DeleteButton
              onDeleteThunk={deleteUser()}
              setErrors={setErrors}
              redirectUrl={`/`}
            />
          ) : (
            <DemoUserButton setErrors={setErrors} />
          )
        )}
      >
        <InputField
          label="First Name"
          value={firstName}
          onChange={setFirstName}
        />
        {errors.firstName && <p className="input-error">{errors.firstName}</p>}
        <InputField
          label="Last Name"
          value={lastName}
          onChange={setLastName}
        />
        {errors.lastName && <p className="input-error">{errors.lastName}</p>}
        <InputField
          label="Email"
          value={email}
          onChange={setEmail}
        />
        {errors.email && <p className="input-error">{errors.email}</p>}
        <InputField
          label="Username"
          value={username}
          onChange={setUsername}
        />
        {errors.username && <p className="input-error">{errors.username}</p>}
        <ImageField
          label="Profile Image"
          onChange={setProfileImage}
        />
        {errors.profileImage && <p className="input-error">{errors.profileImage}</p>}
        <InputField
          label="Password"
          isPassword={true}
          value={password}
          onChange={setPassword}
        />
        <InputField
          label="Confirm Password"
          isPassword={true}
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        {errors.password && <p className="input-error">{errors.password}</p>}
        {!userStorefront && (
          <div className="auth-form-checkbox-wrapper">
            <label className="auth-form-checkbox-label">Start a storefront?</label>
            <input
              className="auth-form-checkbox"
              type="checkbox"
              value={startStorefront}
              onChange={() => setStartStorefront(!startStorefront)}
            />
          </div>
        )}
      </FormWrapperComponent>
    </>
  );
}