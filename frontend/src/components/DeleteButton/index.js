import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import CTAButton from "../CTAButton";
import "./DeleteButton.css"

export default function DeleteButton({
    onDeleteThunk, // Deletion thunk to run on click
    setErrors, // Error handling state setter passed
}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = async () => {
        const data = await dispatch(onDeleteThunk());


        if (data) {
            setErrors(data);
        } else {
            history.push('/');
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
