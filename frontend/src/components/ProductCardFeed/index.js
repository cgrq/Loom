import ProductCard from "../ProductCard"
import "./ProductCardFeed.css"

export default function ProductCardFeed({
    products,
}) {
    if (!products) return null
    return (
        <div className="product-card-feed-container">
            <div className="product-card-feed-wrapper">
                {
                    Object.values(products).map((product) => {
                        return <ProductCard key={product.id} product={product} />
                    })
                }
            </div>
        </div>
    )
}
