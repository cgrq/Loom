import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductByName, resetProducts } from "../../store/products"
import "./ProductPage.css"
import ProductPageReviews from "../ProductPageReviews"
import { getReviewsByProductId } from "../../store/reviews"
import StarSetter from "../StarSetter"
import ProductImages from "../ProductImages"


export function ProductPage() {
    const dispatch = useDispatch()
    const { productName } = useParams()
    const { allProducts } = useSelector(state => state.products)
    const allReviews = useSelector(state => state.reviews)
    const [product, setProduct] = useState({})
    const [avgRating, setAvgRating] = useState()
    const [totalRatings, setTotalRatings] = useState()

    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [image6, setImage6] = useState("");

    const [selectedImage, setSelectedImage] = useState()

    useEffect(() => {
        dispatch(getProductByName(productName))

        return () => {
            dispatch(resetProducts())
        }
    }, [])

    useEffect(() => {
        const allProductsArr = Object.values(allProducts);

        if (allProductsArr.length > 0) {
            const currentProduct = allProductsArr.find(
                (product) => product.name === productName
            );

            // If the product does exist...
            if (Object.values(currentProduct).length > 0) {
                // ...set the product state to be equal to the current product.
                setProduct(currentProduct);
            }
        }
    }, [allProducts])

    useEffect(() => {
        if (product.id) {
            dispatch(getReviewsByProductId(product.id))
        }

        if (Object.values(product).length > 0 && product.productImages && product.productImages.image1) {
            setImage1(product.productImages.image1)
            setImage2(product.productImages.image2)
            setImage3(product.productImages.image3)
            setImage4(product.productImages.image4)
            setImage5(product.productImages.image5)
            setImage6(product.productImages.image6)

            setSelectedImage("image1")
        }
    }, [product])

    useEffect(() => {
        if (allReviews[product.id]) {
            const currentProductReviewsArr = Object.values(allReviews[product.id])
            if (currentProductReviewsArr.length > 0) {
                const starSum = currentProductReviewsArr.reduce((acc, review) => acc + review.rating, 0);
                setAvgRating((Math.round((starSum / currentProductReviewsArr.length) * 10) / 10).toFixed(1))
                setTotalRatings(currentProductReviewsArr.length)
            } else {
                setAvgRating(0)
                setTotalRatings(0)
            }
        } else {
            setAvgRating(0)
            setTotalRatings(0)
        }
    }, [allReviews])

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

    if ((!avgRating && avgRating !== 0) || (!totalRatings && totalRatings !== 0) || !allReviews || !Object.values(product).length || !product.name || !product.productImages) return null;

    const productImages = Object.values(product.productImages).filter((value) => typeof value === 'string' && value.startsWith('http'));

    return (
        <div>
            <div className="product-page-upper-wrapper">
                <div className="product-page-title-wrapper">
                    <h1 className="product-page-name">{product.name}</h1>
                </div>
                <div className="product-page-content-wrapper">
                    <ProductImages
                        selectedImage={returnSelectedImage()}
                        setSelectedImage={setSelectedImage}
                        componentType="read"
                        imageUrls={productImages}
                    />
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
                                                    {`${avgRating}`}

                                                </span>
                                                : <span className="product-page-avg-rating">
                                                    Not yet rated
                                                </span>
                                        }
                                    </div>
                                    <StarSetter value={avgRating} />
                                    <span className="product-page-avg-rating-review-total">
                                        {`${totalRatings} ratings`}
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
