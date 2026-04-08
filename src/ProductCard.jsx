// ProductCard component — displays a single product
// receives a product object and a function via props
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">

      {/* emoji used as a placeholder image */}
      <div className="product-image">{product.image}</div>

      {/* product details */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {/* category shown in grey as secondary info */}
        <p className="product-category">{product.category}</p>

        {/* toFixed(2) ensures price always shows 2 decimal places e.g. £19.00 */}
        <p className="product-price">£{product.price.toFixed(2)}</p>
      </div>

      {/* arrow function wrapper is needed so onAddToCart only fires on click */}
      {/* without it the function would run immediately when the page loads */}
      <button
        className="add-to-cart-btn"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;