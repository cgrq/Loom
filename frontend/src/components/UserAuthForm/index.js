import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, editUser } from "../../store/session";
import { useHistory } from 'react-router-dom';
import "./UserAuthForm.css"

export default function UserAuthForm({ componentType }) {
    const history = useHistory();
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
            } else{
                history.push('/');
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
            setprofileImage(sessionUser.profile_image_url);
            setUsername(sessionUser.username);
        }
    }, [sessionUser]);

    return (
        <>
            <div className="auth-form-wrapper">
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
                    {errors.firstName && <p className="input-error">{errors.firstName}</p>}
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    {errors.lastName && <p className="input-error">{errors.lastName}</p>}
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {errors.email && <p className="input-error">{errors.email}</p>}

                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    {errors.username && <p className="input-error">{errors.username}</p>}

                    <div>
                        <label>Profile Image</label>
                        <input
                            type="text"
                            value={profileImage}
                            onChange={(e) => setprofileImage(e.target.value)}
                        />
                    </div>
                    {errors.profileImage && <p className="input-error">{errors.profileImage}</p>}

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
                    {errors.password && <p className="input-error">{errors.password}</p>}


                    <button className="user-auth-form-button" type="submit">
                        {componentType === "update" ? "Edit user" : "Sign Up"}
                    </button>
                </form>
            </div>
        </>
    );
}
