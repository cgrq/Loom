import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductByName } from "../../store/products"
import "./ProductPage.css"


export function ProductPage() {
    const dispatch = useDispatch()
    const { productName } = useParams()
    const { allProducts } = useSelector(state => state.products)
    const [product, setProduct] = useState({})

    const [mainImage, setMainImage] = useState()


    useEffect(() => {
        dispatch(getProductByName(productName))
    }, [])

    useEffect(() => {
        const currentProduct = Object.values(allProducts).find(
            (product) => product.name === productName
        );
        // If the product does exist...
        if (currentProduct) {
            // ...set the product state to be equal to the current product.
            setProduct(() => currentProduct);
        }
    }, [allProducts])

    useEffect(() => {
        if (product && product.productImages && product.productImages[0] && product.productImages[0].image1) {
            setMainImage(product.productImages[0].image1)
        }
    }, [product])

    if (!product || !product.name) return null;
    const productImages = product.productImages[0]




    return (
        <div>
            <div className="product-page-image-title-wrapper">
                <div className="product-page-images-wrapper">
                    <h1 className="product-page-name">{product.name}</h1>

                    <div>
                        <img
                            className="product-page-display-image"
                            src={mainImage}
                        />
                    </div>
                    <div className="product-page-image-button-wrapper">
                        <img
                            className="product-page-image-button"
                            src={productImages.image1}
                            onClick={() => setMainImage(() => productImages.image1)}
                        />
                        <img
                            className="product-page-image-button"
                            src={productImages.image2}
                            onClick={() => setMainImage(() => productImages.image2)}
                        />
                        <img
                            className="product-page-image-button"
                            src={productImages.image3}
                            onClick={() => setMainImage(() => productImages.image3)}
                        />
                        <img
                            className="product-page-image-button"
                            src={productImages.image4}
                            onClick={() => setMainImage(() => productImages.image4)}
                        />
                        <img
                            className="product-page-image-button"
                            src={productImages.image5}
                            onClick={() => setMainImage(() => productImages.image5)}
                        />
                        <img
                            className="product-page-image-button"
                            src={productImages.image6}
                            onClick={() => setMainImage(() => productImages.image6)}
                        />
                    </div>
                </div>
                <div className="product-page-details-wrapper">
                    <div className="product-page-details-row product-page-price-quantity">
                        <div className="product-page-price">
                            <div className="product-page-price-dollar-sign">$</div>
                            {product.price}
                        </div>
                        <div className="product-page-quantity">
                            {product.quantity}
                            <div className="product-page-quantity-left">left</div>
                        </div>
                    </div>
                    <div className="product-page-details-row">
                        <div  className="product-page-details-label">
                            Product Description:
                        </div>
                        <div>
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
