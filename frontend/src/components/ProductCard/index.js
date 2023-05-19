import { useEffect, useState } from "react"
import "./ProductCard.css"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentProduct } from "../../store/products"


export default function ProductCard({ product }) {
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL + "/default-profile-pic.png")

    useEffect(() => {
        setImageUrl(product.productImages.length > 0 ? product.productImages[0].image1 : process.env.PUBLIC_URL + "/default-profile-pic.png")
    }, [product])



    return (
        <div key={product.id} className="product-card-wrapper">
            <img onError={() => setImageUrl(process.env.PUBLIC_URL + "/default-image.png")} src={imageUrl} />
            <div className="product-card-details-wrapper">
                <span>{product.name}</span>
                <div>${product.price}</div>
                <div className="product-card-quantity-wrapper">
                    <div>Remaining:</div>
                    <div>{product.quantity}</div>
                </div>
                <NavLink to={`/storefront/products/${product.id}/edit`}>
                    <button >Edit</button>
                </NavLink>
            </div>
        </div>
    )
}
