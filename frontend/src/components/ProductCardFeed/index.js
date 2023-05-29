import ProductCard from "../ProductCard";
import "./ProductCardFeed.css";

export default function ProductCardFeed({ products }) {
  if (!products) return null;

  const productArray = Object.values(products); // Convert nested object to an array
  const sortedProducts = productArray.sort((a, b) => b.id - a.id); // Sort products in descending order based on ID

  return (
    <div className="product-card-feed-container">
      <div className="product-card-feed-wrapper">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
