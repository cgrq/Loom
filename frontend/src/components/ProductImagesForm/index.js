import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductImagesThunk, editProductImagesThunk, getStorefrontProductsThunk } from "../../store/products";
import { getUserStorefrontThunk } from "../../store/storefronts"

import { useHistory, useParams } from 'react-router-dom';
import "./ProductImagesForm.css"
import FormWrapperComponent from "../FormWrapperComponent";
import ProductImages from "../ProductImages";
import ImageField from "../ImageField";


export default function ProductImagesForm({
}) {
    const history = useHistory();
    const dispatch = useDispatch();

    // Product name variable from route url.
    const { productName } = useParams();

    // Form input field state variables.
    const [image1, setImage1] = useState("https://loom-shopping.s3.us-west-1.amazonaws.com/product+image+upload+placeholder/image1.png");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [image6, setImage6] = useState("");

    const [selectedImage, setSelectedImage] = useState("image1")
    const [productImages, setProductImages] = useState([image1])
    const [updatingProductImage, setUpdatingProductImages] = useState(false);


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

            setSelectedImage("image1")
        }
    }, [product])

    useEffect(() => {
        setProductImages([image1, image2, image3, image4, image5, image6].filter((url) => {
            if (typeof url === 'string' && url.startsWith('http')) {
                return true;
            } else if (url instanceof File) {
                return true;
            }
            return false;
        }));

    }, [image1, image2, image3, image4, image5, image6])

    // Guard clause.
    // If the storefront doesn't have any products then don't render anything.
    if (Object.values(storefrontProducts).length === 0) {
        return null
    }



    const returnSelectedImage = () => {
        switch (selectedImage) {
            case "image1":
                return image1;
            case "image2":
                return image2;
            case "image3":
                return image3;
            case "image4":
                return image4;
            case "image5":
                return image5;
            case "image6":
                return image6;
            default:
                return "";
        }
    }

    const returnImageSetter = () => {
        switch (selectedImage) {
            case "image1":
                return setImage1;
            case "image2":
                return setImage2;
            case "image3":
                return setImage3;
            case "image4":
                return setImage4;
            case "image5":
                return setImage5;
            case "image6":
                return setImage6;
            default:
                return "";
        }

    }

    const handleRemoveButtonImageClick = (index) => {
        switch (index) {
          case 1:
            setImage1(image2);
            setImage2(image3);
            setImage3(image4);
            setImage4(image5);
            setImage5(image6);
            setImage6("");
            setSelectedImage("image1");
            break;
          case 2:
            setImage2(image3);
            setImage3(image4);
            setImage4(image5);
            setImage5(image6);
            setImage6("");
            setSelectedImage("image1");
            break;
          case 3:
            setImage3(image4);
            setImage4(image5);
            setImage5(image6);
            setImage6("");
            setSelectedImage("image1");
            break;
          case 4:
            setImage4(image5);
            setImage5(image6);
            setImage6("");
            setSelectedImage("image1");
            break;
          case 5:
            setImage5(image6);
            setImage6("");
            setSelectedImage("image1");
            break;
          case 6:
            setImage6("");
            setSelectedImage("image1");
            break;
          default:
            break;
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (image1 === "https://loom-shopping.s3.us-west-1.amazonaws.com/product+image+upload+placeholder/image1.png") {
            setErrors({
                image1: "The first image is required"
            })
            return;
        }

        const formData = new FormData();

        formData.append("image1", image1)
        formData.append("image2", image2)
        formData.append("image3", image3)
        formData.append("image4", image4)
        formData.append("image5", image5)
        formData.append("image6", image6)
        formData.append("productId", product.id)

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


    if (!productImages) return null

    return (
        <>
            <FormWrapperComponent
                title={componentType === "update" ? "Step 2: Edit product images" : "Step 2: Add product images"}
                onSubmit={handleSubmit}
                submitButtonText={componentType === "update" ? "Update" : "Create"}
            >
                <ProductImages
                    selectedImage={returnSelectedImage()}
                    setSelectedImage={setSelectedImage}
                    imageUrls={productImages}
                    componentType={componentType}
                    onAddButtonImageClick={returnImageSetter()}
                    onRemoveButtonImageClick={handleRemoveButtonImageClick}
                />
                <div className="product-image-form-image-field">
                    <ImageField
                        label={"Upload new image"}
                        onChange={returnImageSetter()}
                    />
                </div>
                {errors.image1 && <p className="input-error">{errors.image1}</p>}
                {errors.image2 && <p className="input-error">{errors.image2}</p>}
                {errors.image3 && <p className="input-error">{errors.image3}</p>}
                {errors.image4 && <p className="input-error">{errors.image4}</p>}
                {errors.image5 && <p className="input-error">{errors.image5}</p>}
                {errors.image6 && <p className="input-error">{errors.image6}</p>}
            </FormWrapperComponent>

        </>
    )
}
