import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapperComponent from "../FormWrapperComponent"
import { useHistory, useParams } from 'react-router-dom';
import "./ProductForm.css"
import { getProductByName, createProductThunk, editProductThunk,  deleteProduct, getStorefrontProductsThunk } from "../../store/products";
import InputField from "../InputField";
import DeleteButton from "../DeleteButton";
import SelectField from "../SelectField";
import { getUserStorefrontThunk } from "../../store/storefronts";

export default function ProductForm({
    componentType, // Either update or create. Leaving blank defaults to create
}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { productName } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const { userStorefront } = useSelector((state) => state.storefronts)
    const { storefrontProducts } = useSelector((state) => state.products)
    const [product, setProduct] = useState({})
    const [isUserStorefront, setIsUserStorefront] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getProductByName(productName))
        dispatch(getUserStorefrontThunk())
    }, [])


    useEffect(() => {
        setIsUserStorefront(Object.values(storefrontProducts).find(product => product.storefrontId === userStorefront.id))




    }, [storefrontProducts]);

    useEffect(()=>{
        dispatch(getStorefrontProductsThunk(userStorefront.id));

        // If the current signed in user has a storefront,
        // and that storefront has products...
        if (Object.values(storefrontProducts).length > 0 && componentType === "update") {
            // ...check if the current product exists in the storefront.
            const currentProduct = Object.values(storefrontProducts).find(
                (product) => product.name === productName
            );
            // If the product does exist...
            if (currentProduct) {
                // ...set the product state to be equal to the current product.
                setProduct(() => currentProduct);
            }
        }
    }, [userStorefront])


    // Set form input state variables to current product's values if making an update.
    useEffect(() => {
        if (storefrontProducts && Object.values(storefrontProducts).length > 0 && componentType == "update") {
            if (product) {
                setId(product.id)
                setName(product.name)
                setDescription(product.description)
                setQuantity(product.quantity)
                setPrice(product.price)
                setCategory(product.category)
                setSubcategory(product.subcategory)
            }

        }
    }, [storefrontProducts])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storefrontId = userStorefront.id
        const data =
            componentType === "update"
                ? await dispatch(
                    editProductThunk(
                        id,
                        name,
                        description,
                        quantity,
                        price,
                        category,
                        subcategory,
                        storefrontId
                    )
                )
                : await dispatch(
                    createProductThunk(
                        name,
                        description,
                        quantity,
                        price,
                        category,
                        subcategory,
                        storefrontId
                    )
                )
        if (data) {
            setErrors(data);
        } else {
            history.push(`/products/${name}/edit/images`)
        }

    };
    const handleDelete = async () => {
        history.push('/storefront');

        const data = await dispatch(deleteProduct(id));


        if (data) {
            setErrors(data);
        } else {
        }

    };



    return sessionUser ? (

        <>
            <FormWrapperComponent
                title={componentType === "update" ? "Step 1: Edit Product Details" : "Step 1: Enter product details"}
                onSubmit={handleSubmit}
                submitButtonText="Next"
                lowerComponent={() =>
                (
                    componentType === "update"
                        ? (
                            <DeleteButton
                                onDeleteThunk={deleteProduct(id, subcategory)}
                                redirectUrl={`/${userStorefront.name}`}
                                setErrors={setErrors}
                            />

                        )
                        : null
                )}
            >
                <InputField
                    label="Name"
                    value={name}
                    onChange={setName}
                />
                {errors.name && <p className="input-error">{errors.name}</p>}
                <InputField
                    label="Description"
                    value={description}
                    onChange={setDescription}
                />
                {errors.description && <p className="input-error">{errors.description}</p>}

                <InputField
                    label="Quantity"
                    value={quantity}
                    onChange={setQuantity}
                />
                {errors.quantity && <p className="input-error">{errors.quantity}</p>}

                <InputField
                    label="Price"
                    value={price}
                    onChange={setPrice}
                />
                {errors.price && <p className="input-error">{errors.price}</p>}

                <SelectField
                    label="Category"
                    value={category}
                    options={["clothing", "furniture", "art"]}
                    onChange={setCategory}
                />
                {errors.category && <p className="input-error">{errors.category}</p>}

                {
                    category && category === "clothing" &&
                    <>
                         <SelectField
                            label="Subcategory"
                            value={subcategory}
                            options={["tops", "bottoms", "footwear"]}
                            onChange={setSubcategory}
                        />
                        {errors.subcategory && <p className="input-error">{errors.subcategory}</p>}
                    </>
                }
                {
                    category && category === "furniture" &&
                    <>
                         <SelectField
                            label="Subcategory"
                            value={subcategory}
                            options={["seating", "surfaces", "storage"]}
                            onChange={setSubcategory}
                        />
                        {errors.subcategory && <p className="input-error">{errors.subcategory}</p>}
                    </>
                }
                {
                    category && category === "art" &&
                    <>
                         <SelectField
                            label="Subcategory"
                            value={subcategory}
                            options={["walls", "spaces", "desk"]}
                            onChange={setSubcategory}
                        />
                        {errors.subcategory && <p className="input-error">{errors.subcategory}</p>}
                    </>
                }


            </FormWrapperComponent>

        </>
    )
        : (
            <h1>Please log in to create a store front and start creating products</h1>
        )
}
