'use client'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import CTAButton from '../CTAButton';


export default function DemoUserButtonComponent({ setErrors }) {
    const router = useRouter();
    const dispatch = useDispatch()

    const handleDemoSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login("demo1@aa.io", "password"))

        if (data) {
            setErrors(data);
        } else {
            router.push('/');
        }
    };

    return (
        <CTAButton
            buttonText={"Log in as Demo User"}
            onClick={handleDemoSubmit}
        />
    )
}