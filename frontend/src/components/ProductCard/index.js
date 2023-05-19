import { useEffect, useState } from "react"
import "./ProductCard.css"


export default function ProductCard({ product}){
    const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL + "/default-profile-pic.png")

    useEffect(()=>{
        setImageUrl(product.productImages.length > 0 ? product.productImages[0].image1 : process.env.PUBLIC_URL + "/default-profile-pic.png")
    },[product])

    return (
        <div key={product.id} className="product-card-wrapper">
            <img onError={()=> setImageUrl(process.env.PUBLIC_URL + "/default-image.png")} src={imageUrl} />
            <div className="product-card-details-wrapper">
                <span>{product.name}</span>
                <div>${product.price}</div>
                <div className="product-card-quantity-wrapper">
                    <div>Remaining:</div>
                    <div>{product.quantity}</div>
                </div>
            </div>
        </div>
    )
}
