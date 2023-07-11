import { useEffect, useState } from "react"
import "./ProductCard.css"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentProduct } from "../../store/products"
import StarSetter from "../StarSetter"
import AddToCartButton from "../AddToCartButton"


export default function ProductCard({ product }) {
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL + "/product-card-loading.png")
    const [imageLoaded, setImageLoaded] = useState(false);
    const { storefrontProducts } = useSelector(state => state.products)
    const allReviews = useSelector(state => state.reviews)
    const { user } = useSelector(state => state.session)
    const { userStorefront } = useSelector(state => state.storefronts)
    const [avgRating, setAvgRating] = useState(0)


    useEffect(() => {
        if (product && product.productImages && product.productImages[0]) {
            setImageUrl(product.productImages.length > 0 ? product.productImages[0].image1 : process.env.PUBLIC_URL + "/default-profile-pic.png")
        }
    }, [product])

    useEffect(() => {
        if (allReviews[product.id]) {
            const currentProductReviewsArr = Object.values(allReviews[product.id])
            if (
                currentProductReviewsArr.length > 0
            ) {
                const starSum = currentProductReviewsArr.reduce((acc, review) => acc + review.rating, 0);
                setAvgRating((Math.round((starSum / currentProductReviewsArr.length) * 10) / 10).toFixed(1))
            }
        }
    }, [allReviews])

    useEffect(() => {
        if (imageUrl) {
            setImageLoaded(true)
        } else {
            setImageLoaded(false)
        }
    }, [imageUrl])

    // if (!imageUrl || !product || !product.productImages || !product.productImages[0] || !allReviews) return null

    return (
        <div key={product.id} className="product-card-wrapper">
            <NavLink to={`/products/${product.name}`}>
                <img
                    // onError={() => setImageUrl(process.env.PUBLIC_URL + "/default-image.png")}
                    src={imageUrl}
                />
            </NavLink>
            <div className="product-card-details-wrapper">
                <div className="product-card-price-wrapper">
                    <div className="product-card-price">${product.price}</div>
                    <StarSetter
                        value={avgRating}
                    />
                </div>
                <div className="product-card-name-wrapper">
                    <span className="product-card-name">{product.name}</span>
                </div>
                <div className="product-card-lower-wrapper">
                    {
                        user
                        && storefrontProducts
                        && storefrontProducts[product.id]
                        && userStorefront
                        && storefrontProducts[product.id].storefrontId === userStorefront.id
                        ? (
                            <NavLink to={`/products/${product.name}/edit`}>
                                Edit
                            </NavLink>
                        )
                        :
                        (
                            <AddToCartButton productId={product.id}/>
                        )
                    }
                </div>

            </div>
        </div>

    )
}
