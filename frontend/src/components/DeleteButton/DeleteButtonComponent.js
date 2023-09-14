'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from 'next/navigation';
import CTAButton from "../CTAButton";
import "./DeleteButtonComponent.css"

export default function DeleteButtonComponent({
    onDeleteThunk, // Deletion thunk to run on click
    setErrors, // Error handling state setter passed
    redirectUrl, // Redirect url to push to history on delete
}) {
    const dispatch = useDispatch();
    const router = useRouter();

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = async () => {
        const data = await dispatch(onDeleteThunk);


        if (data) {
            setErrors(data);
        } else {
            router.push(redirectUrl);
        }

    };

    return (
        <div className="delete-button-wrapper">
            <button className={`cta-button ${confirmDelete ? "standard-button" : "warning-button"}`} onClick={() => setConfirmDelete(!confirmDelete)}>{confirmDelete ? "Cancel" : "Delete"}</button>
            {
                confirmDelete && (
                    <div className="delete-button-confirmation-wrapper">
                        <div>Are you sure?</div>
                        <div className="delete-button-final-warning"> This can't be undone.</div>
                        <CTAButton
                            buttonText="Delete"
                            warningButton={true}
                            onClick={handleDelete}
                        />
                    </div>
                )
            }
        </div>
    )
}