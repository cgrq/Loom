import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductImagesThunk, editProductImagesThunk, getStorefrontProductsThunk } from "../../store/products";
import { getUserStorefrontThunk } from "../../store/storefronts"

import { useHistory, useParams } from 'react-router-dom';
import "./ProductImagesForm.css"
import FormWrapperComponent from "../FormWrapperComponent";
import InputField from "../InputField";
import ImageField from "../ImageField";

export default function ProductImagesForm({
}) {
    const history = useHistory();
    const dispatch = useDispatch();

    // Product name variable from route url.
    const { productName } = useParams();

    // Form input field state variables.
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [image6, setImage6] = useState("");

    // Current product variable.
    const [product, setProduct] = useState({})

    // Makes component dynamic between "update" and "create" states.
    // State is set dynamically based on whether or not the product has images.
    const [componentType, setComponentType] = useState("create")

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [errors, setErrors] = useState({});

    // Store listeners.
    const sessionUser = useSelector((state) => state.session.user);
    const { allProducts } = useSelector((state) => state.products)
    const { storefrontProducts } = useSelector((state) => state.products)
    const { userStorefront } = useSelector((state) => state.storefronts)




    // Get the user's storefront on mount...
    useEffect(() => {
        dispatch(getUserStorefrontThunk())
    }, [])

    // ...once we have the storefront get the storefront's products.
    useEffect(() => {
        dispatch(getStorefrontProductsThunk(userStorefront.id))
    }, [userStorefront])

    useEffect(() => {
        // If the current signed in user has a storefront,
        // and that storefront has products...
        if (Object.values(storefrontProducts).length > 0) {
            // ...check if the current product exists in the storefront.
            const currentProduct = Object.values(storefrontProducts).find(
                (product) => product.name === productName
            );
            // If the product does exist...
            if (currentProduct) {
                // ...set the product state to be equal to the current product.
                setProduct(() => currentProduct);
                // Then check if there are any images associated with the product...
                if (currentProduct.productImages.length > 0) {
                    // ...if there are images then we change the component type to "update".
                    setComponentType("update");
                }
            } else {
                // If it doesn't exist...
                // ...redirect users to the resource not found page.
                history.push("/not-found");
            }
        }
    }, [storefrontProducts, productName, history]);

    // Set form input state variables to current product's values if making an update.
    useEffect(() => {
        if (product && product.productImages && componentType == "update") {
            setImage1(product.productImages[0].image1)
            setImage2(product.productImages[0].image2)
            setImage3(product.productImages[0].image3)
            setImage4(product.productImages[0].image4)
            setImage5(product.productImages[0].image5)
            setImage6(product.productImages[0].image6)
        }
    }, [product])

    // Guard clause.
    // If the storefront doesn't have any products then don't render anything.
    if (Object.values(storefrontProducts).length === 0) {
        return null
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("image1",image1)
        formData.append("image2",image2)
        formData.append("image3",image3)
        formData.append("image4",image4)
        formData.append("image5",image5)
        formData.append("image6",image6)
        formData.append("productId",product.id)

        const data =
            componentType === "update"
                ? await dispatch(
                    editProductImagesThunk(formData)
                )
                : await dispatch(
                    createProductImagesThunk(formData)
                );
        if (data) {
            setErrors(data);
        } else {

            history.push('/storefront');
        }

    };


    return (
        <>
            <FormWrapperComponent
                title={componentType === "update" ? "Step 2: Edit product images" : "Step 2: Add product images"}
                onSubmit={handleSubmit}
                submitButtonText={componentType === "update" ? "Update" : "Create"}
            >

                <ImageField
                    label="Main"
                    onChange={setImage1}
                />
                {errors.image1 && <p className="input-error">{errors.image1}</p>}
                <ImageField
                    label="A"
                    onChange={setImage2}
                />
                {errors.image1 && <p className="input-error">{errors.image2}</p>}
                <ImageField
                    label="B"
                    onChange={setImage3}
                />
                {errors.image1 && <p className="input-error">{errors.image3}</p>}
                <ImageField
                    label="C"
                    onChange={setImage4}
                />
                {errors.image1 && <p className="input-error">{errors.image4}</p>}
                <ImageField
                    label="D"
                    onChange={setImage5}
                />
                {errors.image1 && <p className="input-error">{errors.image5}</p>}
                <ImageField
                    label="E"
                    onChange={setImage6}
                />
                {errors.image6 && <p className="input-error">{errors.image6}</p>}
            </FormWrapperComponent>

        </>
    )
}
