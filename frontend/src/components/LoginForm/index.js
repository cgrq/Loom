import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css"
import DemoUserButton from "../DemoUserButton";
import FormWrapperComponent from "../FormWrapperComponent";
import InputField from "../InputField";

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
        <FormWrapperComponent
            title={'Log in'}
            onSubmit={handleSubmit}
            submitButtonText={"Log in"}
            lowerComponent={() =>
            (
                <DemoUserButton setErrors={setErrors} />
            )
            }
        >
            <InputField
                label="Email"
                value={email}
                onChange={setEmail}
            />
            {errors.email && <p className="input-error">{errors.email}</p>}
            <InputField
                label="Password"
                value={password}
                isPassword={true}
                onChange={setPassword}
            />
        </FormWrapperComponent>
    );
}
