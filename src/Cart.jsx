// Cart component — the sidebar that slides in from the right
// receives all cart data and functions from App via props
// props are how a parent passes data down to a child component
function Cart({ cart, isCartOpen, onClose, onUpdateQuantity, onRemoveItem, onCheckout }) {

  // DERIVED VALUE: total price of all items in the cart
  // reduce loops through each item and adds price x quantity to the running total
  // starts at 0, toFixed(2) formats to 2 decimal places e.g. £49.99
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toFixed(2);

  return (
    // isCartOpen controls whether 'open' class is added
    // 'open' class slides the sidebar into view via CSS transform
    // template literal: backtick string that lets us insert variables with ${}
    <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>

      {/* cart header with title and close button */}
      <div className="cart-header">
        <h2>Your Cart</h2>
        {/* onClose sets isCartOpen to false in App, hiding the sidebar */}
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      {/* ternary: if cart is empty show message, otherwise show items */}
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        // <> is a React Fragment — groups elements without adding a real DOM element
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">

                {/* span is inline — sits alongside the details div */}
                <span className="cart-item-image">{item.image}</span>

                {/* div is block — name and price stack vertically inside */}
                {/* flex:1 in CSS makes this take up all remaining space */}
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">£{item.price.toFixed(2)}</p>
                </div>

                {/* quantity controls: decrease, current count, increase */}
                {/* passing quantity - 1 or + 1 to onUpdateQuantity */}
                {/* if quantity hits 0, updateQuantity in App removes the item */}
                <div className="cart-item-quantity">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                {/* ✕ is a special character that renders as an X symbol */}
                {/* removes item from cart completely regardless of quantity */}
                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(item.id)}
                >✕</button>

              </li>
            ))}
          </ul>

          {/* total and checkout pinned to the bottom of the sidebar */}
          <div className="cart-footer">
            <p className="cart-total">Total: £{cartTotal}</p>

            {/* onCheckout is passed in from App — opens the checkout modal */}
            <button className="checkout-btn" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;