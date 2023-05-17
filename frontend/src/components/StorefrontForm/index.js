import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStorefrontThunk } from "../../store/storefronts";
import { useHistory } from 'react-router-dom';
import "./Storefront.css"

export default function StorefrontForm({ componentType }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [description, setDescription] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data =
            componentType === "update"
                ? <></>
                // await dispatch(
                //     editUser(
                //         description,
                //         bannerImage
                //     )
                // )
                : await dispatch(
                    createStorefrontThunk(
                        description,
                        bannerImage
                    )
                );
        if (data) {
            setErrors(data);
        } else {
            history.push('/');
        }

    };
    const handleDelete = async () => {
        //     const data = await dispatch(deleteUser());


        //     if (data) {
        //       setErrors(data);
        //     } else {
        //         history.push('/');
        //     }

    };

    // useEffect(() => {
    //     if (componentType === "update" && sessionUser) {
    //         setFirstName(sessionUser.first_name);
    //         setLastName(sessionUser.last_name);
    //     }
    // }, [sessionUser]);


    return sessionUser ? (
        <div className="storefront-form-wrapper">
            <h1 className="user-auth-form-h1">
                {componentType === "update" ? "Edit Storefront" : "Create a Storefront"}
            </h1>
            <form className="storefront-form" onSubmit={handleSubmit}>
                {/* <ErrorHandler errors={errors} /> */}
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                {errors.firstName && <p className="input-error">{errors.firstName}</p>}

                <div>
                    <label>Banner Image</label>
                    <input
                        type="text"
                        value={bannerImage}
                        onChange={(e) => setBannerImage(e.target.value)}
                    />
                </div>
                {errors.profileImage && <p className="input-error">{errors.profileImage}</p>}

                <button className="user-auth-form-button" type="submit">
                    {componentType === "update" ? "Update" : "Create"}
                </button>
            </form>
            {
                componentType === "update"
                    ? (
                        <div>
                            <button onClick={() => setConfirmDelete(!confirmDelete)}>{confirmDelete ? "Cancel" : "Delete"}</button>
                            {
                                confirmDelete && (
                                    <div>
                                        <div>Are you sure you want to delete your storefront?</div>
                                        <button onClick={handleDelete}>Delete</button>
                                    </div>
                                )
                            }
                        </div>
                    )
                    : null
            }
        </div>
    )
        : (
            <h1>Please log in to create a store front</h1>
        )
}
