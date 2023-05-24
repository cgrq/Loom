import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStorefrontThunk, editStorefrontThunk, getStorefrontByName, deleteStorefront } from "../../store/storefronts";
import { useHistory, useParams } from 'react-router-dom';
import "./Storefront.css"
import FormWrapperComponent from "../FormWrapperComponent";
import DemoUserButton from "../DemoUserButton";
import DeleteButton from "../DeleteButton";
import InputField from "../InputField";

export default function StorefrontForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { storefrontName } = useParams();
    const { user } = useSelector((state) => state.session);
    const { userStorefront } = useSelector((state) => state.storefronts)

    const [description, setDescription] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const [componentType, setComponentType] = useState("create")
    const [hidePreviewImage, setHidePreviewImage] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getStorefrontByName(storefrontName))
    }, [])

    useEffect(() => {
        if (userStorefront) {
            setComponentType("update")
            setDescription(userStorefront.description)
            setBannerImage(userStorefront.banner_image)
        }
    }, [userStorefront])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data =
            componentType === "update"
                ?
                await dispatch(
                    editStorefrontThunk(
                        description,
                        bannerImage
                    )
                )
                : await dispatch(
                    createStorefrontThunk(
                        description,
                        bannerImage
                    )
                );
        if (data) {
            setErrors(data);
        } else {
            history.push(`/${user.username}`);
        }

    };

    const handleImageLoad = () => {
        setHidePreviewImage(false);
    };

    const handleImageError = () => {
        setHidePreviewImage(true);
    };

    return user ? (
        <>
            <FormWrapperComponent
                title={`${userStorefront ? "Edit":"Create"} Storefront`}
                onSubmit={handleSubmit}
                submitButtonText={`${userStorefront ? "Edit":"Create"}`}
                lowerComponent={() =>
                (componentType === "update"
                    ? (
                        <DeleteButton
                            onDeleteThunk={deleteStorefront(userStorefront.id)}
                            redirectUrl={`/`}
                            setErrors={setErrors}
                        />
                    )
                    : (
                        null
                    ))
                }
            >
                <div className="storefront-form-image-preview-container">
                    <div className="storefront-form-image-preview-wrapper">
                        <img
                            src={bannerImage}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            className={"storefront-form-image-preview " + (hidePreviewImage ? "hidden" : "")}
                        />
                        <img
                            src={process.env.PUBLIC_URL + "/storefront-banner-preview.png"}
                            className="storefront-form-image-placeholder"
                        />
                    </div>
                </div>
                <InputField
                    label="Banner Image"
                    value={bannerImage}
                    onChange={setBannerImage}
                />
                {errors.bannerImage && <p className="input-error">{errors.bannerImage}</p>}
                <InputField
                    label="Description"
                    value={description}
                    onChange={setDescription}
                />

                {errors.description && <p className="input-error">{errors.description}</p>}
            </FormWrapperComponent>

        </>
    )
        : (
            <h1>Please log in to create a store front</h1>
        )
}
