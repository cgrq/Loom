import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductByName } from "../../store/products"
import "./ProductPage.css"
import ProductPageReviews from "../ProductPageReviews"
import { getReviewsByProductId } from "../../store/reviews"
import StarSetter from "../StarSetter"


export function ProductPage() {
    const dispatch = useDispatch()
    const { productName } = useParams()
    const { allProducts } = useSelector(state => state.products)
    const { reviews } = useSelector(state => state)
    const [product, setProduct] = useState({})
    const [avgRating, setAvgRating] = useState(0)

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
        if (product.id) {
            dispatch(getReviewsByProductId(product.id))
        }

        if (Object.values(product).length > 0 && product.productImages && product.productImages[0] && product.productImages[0].image1) {
            setMainImage(product.productImages[0].image1)
        }
    }, [product])

    useEffect(() => {
        const reviewsArr = Object.values(reviews);
        if (reviewsArr.length > 0) {
            // console.log("123", reviews[0].rating)
            const starSum = reviewsArr.reduce((acc, review) => acc + review.rating, 0);
            setAvgRating(starSum / reviewsArr.length)
        }
    }, [reviews])

    if (!Object.values(product).length || !product.name) return null;
    const productImages = product.productImages[0]


    if (!productImages || !productImages.image1) return null;

    return (
        <div>
            <div className="product-page-upper-wrapper">
                <div className="product-page-title-wrapper">
                    <h1 className="product-page-name">{product.name}</h1>
                </div>
                <div className="product-page-content-wrapper">
                    <div className="product-page-images-wrapper">
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

                        </div>
                        <div className="product-page-details-row product-page-average-rating-wrapper">
                            {
                                <>
                                    <div className="product-page-avg-rating-wrapper">
                                        {
                                            avgRating > 0
                                                ? <span className="product-page-avg-rating">
                                                    {`${(Math.round(avgRating * 10) / 10).toFixed(1)}`}

                                                </span>
                                                : <span>
                                                    Not yet rated
                                                </span>
                                        }
                                    </div>
                                    <StarSetter value={avgRating} />
                                    <span className="product-page-avg-rating-review-total">
                                                          {`${Object.values(reviews).length} ratings`}
                                                    </span>
                                </>
                            }
                        </div>
                        <div className="product-page-details-row">
                            <div className="product-page-details-label">
                                Product Description:
                            </div>
                            <div>
                                {product.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-reviews-wrapper">
                <ProductPageReviews productId={product.id} />
            </div>
        </div>
    )
}
