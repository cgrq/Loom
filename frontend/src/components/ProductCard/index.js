import { useEffect, useState } from "react"
import "./ProductCard.css"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentProduct } from "../../store/products"


export default function ProductCard({ product }) {
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState("")
    const { storefrontProducts } = useSelector(state => state.products)
    const { user } = useSelector(state => state.session)
    const { userStorefront } = useSelector(state => state.storefronts)

    useEffect(() => {
        if(product && product.productImages && product.productImages[0]){
            setImageUrl(product.productImages.length > 0 ? product.productImages[0].image1 : process.env.PUBLIC_URL + "/default-profile-pic.png")
        }
    }, [product])

    if (!imageUrl || !product || !product.productImages || !product.productImages[0]) return null

    return (
        <div key={product.id} className="product-card-wrapper">
            <NavLink to={`/products/${product.name}`}>
                <img
                // onError={() => setImageUrl(process.env.PUBLIC_URL + "/default-image.png")}
                src={imageUrl}
            />

            </NavLink>
            <div className="product-card-details-wrapper">
                <div className="product-card-name-wrapper">
                    <div className="product-card-price">${product.price}</div>
                    <div>
                        <i className="fas fa-star product-card-star"></i>
                        <i className="fas fa-star product-card-star"></i>
                        <i className="fas fa-star product-card-star"></i>
                        <i className="fas fa-star product-card-star"></i>
                        <i className="fas fa-star-half product-card-star"></i>
                    </div>
                </div>
                <span className="product-card-name">{product.name}</span>
                {
                    user
                    && storefrontProducts
                    && storefrontProducts[product.id]
                    && userStorefront
                    && storefrontProducts[product.id].storefrontId === userStorefront.id
                    && (
                        <NavLink to={`/products/${product.name}/edit`}>
                            Edit
                        </NavLink>
                    )
                }

            </div>
        </div>
    )
}
