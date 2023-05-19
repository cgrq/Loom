import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductImagesThunk, editProductImagesThunk, setCurrentProduct} from "../../store/products";
import { useHistory, useParams } from 'react-router-dom';
import "./ProductImagesForm.css"

export default function ProductImagesForm({
        componentType, // Either update or create. Leaving blank defaults to create
        setEditingProductImagesForm // Renders current product image update if true. Defaults to false and renders product form
    }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { productName } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const { currentProduct } = useSelector((state) => state.products)
    const { allProducts} = useSelector((state) => state.products)

    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [image6, setImage6] = useState("");

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        if(allProducts && allProducts[productName] && componentType == "update"){
            const product = allProducts[productName]
            setImage1(product.productImages[0].image1)
            setImage2(product.productImages[0].image2)
            setImage3(product.productImages[0].image3)
            setImage4(product.productImages[0].image4)
            setImage5(product.productImages[0].image5)
            setImage6(product.productImages[0].image6)
        }
    }, [allProducts])


    useEffect(()=>{
        return () =>{
            dispatch(setCurrentProduct(null))
            setEditingProductImagesForm(false)
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = allProducts[productName]
        const productId = product.id

        const data =
            componentType === "update"
                ? await dispatch(
                    editProductImagesThunk(
                        image1,
                        image2,
                        image3,
                        image4,
                        image5,
                        image6,
                        productId
                    )
                )
                : await dispatch(
                    createProductImagesThunk(
                        image1,
                        image2,
                        image3,
                        image4,
                        image5,
                        image6,
                        productId
                    )
                );
        if (data) {
            setErrors(data);
        } else {

            history.push('/storefront');
        }

    };
    const handleDelete = async () => {
            history.push('/');

            // const data = await dispatch(deleteProduct());


            // if (data) {
            //   setErrors(data);
            // } else {
            // }

    };

    if(!currentProduct) return null

    return sessionUser ? (
        <div className="product-form-wrapper">
            <h1 className="user-auth-form-h1">
                {componentType === "update" ? "Step 2: Edit product images" : "Step 2: Add product images"}
            </h1>
            <form className="product-form" onSubmit={handleSubmit}>
                {/* <ErrorHandler errors={errors} /> */}
                <div>
                    <label>Main image</label>
                    <input
                        type="text"
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                        required
                    />
                </div>
                {errors.image1 && <p className="input-error">{errors.image1}</p>}
                <div>
                    <input
                        type="text"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                        required
                    />
                </div>
                {errors.image2 && <p className="input-error">{errors.image2}</p>}
                <div>

                    <input
                        type="text"
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                        required
                    />
                </div>
                {errors.image3 && <p className="input-error">{errors.image3}</p>}
                <div>

                    <input
                        type="text"
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                        required
                    />
                </div>
                {errors.image4 && <p className="input-error">{errors.image4}</p>}
                <div>

                    <input
                        type="text"
                        value={image5}
                        onChange={(e) => setImage5(e.target.value)}
                        required
                    />
                </div>
                {errors.image5 && <p className="input-error">{errors.image5}</p>}
                <div>

                    <input
                        type="text"
                        value={image6}
                        onChange={(e) => setImage6(e.target.value)}
                        required
                    />
                </div>
                {errors.image6 && <p className="input-error">{errors.image6}</p>}
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
            <h1>Please log in to create a store front</h1>
        )
}
