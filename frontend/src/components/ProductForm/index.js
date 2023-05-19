import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStorefrontThunk, editStorefrontThunk, deleteStorefront } from "../../store/storefronts";
import { useHistory, useParams } from 'react-router-dom';
import "./ProductForm.css"
import { getProductByName, createProductThunk, editProductThunk, setCurrentProduct, deleteProduct } from "../../store/products";

export default function ProductForm({
        componentType, // Either update or create. Leaving blank defaults to create
        setEditingProductImagesForm // Renders product image update if true. Default false to render current product form
    }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { productName } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const { userStorefront } = useSelector((state) => state.storefronts)
    const { allProducts} = useSelector((state) => state.products)

    useEffect(()=>{
        dispatch(getProductByName(productName))
    },[])


    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        if(allProducts && allProducts[productName] && componentType == "update"){
            const product = allProducts[productName]
            setId(product.id)
            setName(product.name)
            setDescription(product.description)
            setQuantity(product.quantity)
            setPrice(product.price)
            setCategory(product.category)
            setSubcategory(product.subcategory)
        }
    }, [allProducts])

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
            setEditingProductImagesForm(true)
            history.push(`/products/${name}/edit`)
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
        <div className="storefront-form-wrapper">
            <h1 className="user-auth-form-h1">
                {componentType === "update" ? "Step 1: Edit Product Details" : "Step 1: Enter product details"}
            </h1>
            <form className="storefront-form" onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                {errors.name && <p className="input-error">{errors.name}</p>}
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                {errors.description && <p className="input-error">{errors.description}</p>}
                <div>
                    <label>Quantity</label>
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                {errors.quantity && <p className="input-error">{errors.quantity}</p>}
                <div>
                    <label>Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                {errors.price && <p className="input-error">{errors.price}</p>}
                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                {errors.category && <p className="input-error">{errors.category}</p>}
                <div>
                    <label>Sub-category</label>
                    <input
                        type="text"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                    />
                </div>
                {errors.subcategory && <p className="input-error">{errors.subcategory}</p>}
                <button className="user-auth-form-button" type="submit">
                    Next
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
                                        <div>Are you sure you want to delete your product?</div>
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
            <h1>Please log in to create a store front and start creating products</h1>
        )
}
