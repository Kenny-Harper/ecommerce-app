// Header component — the top bar of the app
// receives data and functions from App via props
// props are how a parent passes data down to a child component
function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">

      {/* shop name/logo on the left */}
      <h1 className="logo">🛍️ Shop</h1>

      {/* cart button on the right */}
      {/* onCartClick is passed in from App — toggles the cart sidebar */}
      <button className="cart-button" onClick={onCartClick}>
        Cart

        {/* conditional rendering — only show the badge if cart has items */}
        {/* && means: only render what's on the right if the left is true */}
        {cartCount > 0 && (
          <span className="cart-count">{cartCount}</span>
        )}
      </button>
    </header>
  );
}

export default Header;