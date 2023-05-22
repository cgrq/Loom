import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, editUser, deleteUser } from "../../store/session";
import { useHistory } from 'react-router-dom';
import "./UserAuthForm.css"
import DemoUserButton from "../DemoUserButton";
import FormWrapperComponent from "../FormWrapperComponent";
import DeleteButton from "../DeleteButton";
import InputField from "../InputField"


export default function UserAuthForm({ componentType }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [startStorefront, setStartStorefront] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
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
                console.log(`🖥 ~ file: index.js:54 ~ handleSubmit ~ startStorefront:`, startStorefront)
                if (startStorefront) {
                    history.push('/create-a-storefront');
                } else {
                    history.push('/');
                }
            }
        } else {
            if (password !== confirmPassword) {
                setErrors({
                    ...errors,
                    password:
                        "Password fields must match",
                });
            }

        }
    };


    useEffect(() => {
        if (componentType === "update" && sessionUser) {
            setFirstName(sessionUser.first_name);
            setLastName(sessionUser.last_name);
            setEmail(sessionUser.email);
            setProfileImage(sessionUser.profile_image);
            setUsername(sessionUser.username);
        }
    }, [sessionUser]);

    return (
        <>
            <FormWrapperComponent
                title = {componentType === "update" ? "Edit profile details" : "Create a profile"}
                onSubmit={handleSubmit}
                submitButtonText={componentType === "update" ? "Update Profile" : "Create Profile"}
                lowerComponent={() =>
                    (componentType === "update"
                    ? (
                        <DeleteButton
                            onDeleteThunk={deleteUser()}
                            setErrors={setErrors}
                        />
                    )
                    : (
                        <DemoUserButton setErrors={setErrors} />
                    ))
                }
            >
                <InputField
                    label = "First Name"
                    value = {firstName}
                    onChange = {setFirstName}
                />
                {errors.firstName && <p className="input-error">{errors.firstName}</p>}
                <InputField
                    label = "Last Name"
                    value = {lastName}
                    onChange = {setLastName}
                />

                {errors.lastName && <p className="input-error">{errors.lastName}</p>}
                <InputField
                    label = "Email"
                    value = {email}
                    onChange = {setEmail}
                />
                {errors.email && <p className="input-error">{errors.email}</p>}
                <InputField
                    label = "Username"
                    value = {username}
                    onChange = {setUsername}
                />
                {errors.username && <p className="input-error">{errors.username}</p>}
                <InputField
                    label = "Profile Image"
                    value = {profileImage}
                    onChange = {setProfileImage}
                />
                {errors.profileImage && <p className="input-error">{errors.profileImage}</p>}
                <InputField
                    label = "Password"
                    value = {password}
                    onChange = {setPassword}
                />
                <InputField
                    label = "Confirm Password"
                    value = {confirmPassword}
                    onChange = {setConfirmPassword}
                />
                {errors.password && <p className="input-error">{errors.password}</p>}
                <div className="auth-form-checkbox-wrapper">
                    <label className="auth-form-checkbox-label">Start a storefront?</label>
                    <input className="auth-form-checkbox" type="checkbox" value={startStorefront} onChange={() => setStartStorefront(!startStorefront)} />
                </div>
            </FormWrapperComponent>



        </>
    );
}
