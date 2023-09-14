'use client'
import { useEffect, useState } from "react"
import "./ProductCardComponent.css"
import { useRouter } from "next/router"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentProduct } from "../../store/products"
import StarSetter from "../StarSetter"
import AddToCartButton from "../AddToCartButton"
import Image from 'next/image';

export default function ProductCardComponent({ product }) {
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL + "/product-card-loading.png")
    const [imageLoaded, setImageLoaded] = useState(false);
    const { storefrontProducts } = useSelector(state => state.products)
    const allReviews = useSelector(state => state.reviews)
    const { user } = useSelector(state => state.session)
    const { userStorefront } = useSelector(state => state.storefronts)
    const [avgRating, setAvgRating] = useState(0)

    useEffect(() => {
        if (product) {
            setImageUrl(product.productImages ? product.productImages.image1 : process.env.PUBLIC_URL + "/default-profile-pic.png")
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

    const router = useRouter();

    return (
        <div key={product.id} className="product-card-wrapper">
            <Link href={`/products/${product.name}`} as={`/products/${product.name}`}>
                <a>
                    <Image
                        alt={product.name}
                        src={imageUrl}
                        placeholder="blur"
                    />
                </a>
            </Link>
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
                            <Link href={`/products/${product.name}/edit`} as={`/products/${product.name}/edit`}>
                                <a>
                                    Edit
                                </a>
                            </Link>
                        )
                        :
                        (
                            user &&
                            <AddToCartButton productId={product.id}/>
                        )
                    }
                </div>

            </div>
        </div>

    )
}