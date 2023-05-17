import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css"
import DemoUserButton from "../DemoUserButton";

export default function LoginForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(
            login(
                email,
                password,
            )
        )
        if (data) {
            setErrors(data);
        } else {
            history.push('/');
        }
    };
    
    return (
        <>
            <div className="auth-form-wrapper">
                <h1 className="user-auth-form-h1">
                    Login
                </h1>
                <form className="user-auth-form" onSubmit={handleSubmit}>
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
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errors.password && <p className="input-error">{errors.password}</p>}
                    <button className="user-auth-form-button" type="submit">
                        Login
                    </button>
                </form>
                <DemoUserButton setErrors={setErrors} />
            </div>
        </>
    );
}
