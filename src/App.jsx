// useState lets us store and update values that trigger re-renders
// useEffect lets us run code when state changes (here: saving to localStorage)
import { useState, useEffect } from 'react';

// our hardcoded product data — in a real app this would come from an API fetch
import products from './products';

// child components — each one handles its own piece of the UI
import Header from './Header';
import ProductCard from './ProductCard';
import Cart from './Cart';

// checkout modal component — handles form and order confirmation
import Checkout from './Checkout';

function App() {
  // STATE 1: the full list of products
  // no setter needed because products never change in this app
  const [productList] = useState(products);

  // STATE 2: cart items — loaded from localStorage on first render
  // lazy initialiser function only runs once, checks if we have saved cart data
  // JSON.parse converts the saved string back into a JavaScript array
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // STATE 3: whether the cart sidebar is visible
  // true = open, false = closed
  const [isCartOpen, setIsCartOpen] = useState(false);

  // STATE 4: which category filter button is active
  // 'All' means show every product
  const [activeCategory, setActiveCategory] = useState('All');

  // STATE 5: controls whether the checkout modal is open
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // EFFECT: runs every time cart changes
  // saves cart to localStorage so items survive a page refresh
  // JSON.stringify converts array to string — localStorage only stores strings
  // [cart] is the dependency array — only re-run this effect when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // DERIVED VALUE: total number of items across all cart entries
  // reduce loops through cart accumulating a running total of all quantities
  // starts at 0 and adds each item's quantity on every loop
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // DERIVED VALUE: total price of all cart items
  // price x quantity for each item, added together
  // toFixed(2) ensures it always shows 2 decimal places e.g. £49.00
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toFixed(2);

  // DERIVED VALUE: unique list of categories for the filter buttons
  // .map() pulls out just the category from each product
  // new Set() removes any duplicates automatically
  // spread [...] converts the Set back to a regular array
  // 'All' is added manually at the start
  const categories = ['All', ...new Set(productList.map((p) => p.category))];

  // DERIVED VALUE: products filtered by the active category
  // if 'All' is selected, return the full list unchanged
  // otherwise filter to only products matching the active category
  // p is shorthand for each product as the loop runs
  const filteredProducts = activeCategory === 'All'
    ? productList
    : productList.filter((p) => p.category === activeCategory);

  // FUNCTION: adds a product to the cart
  function addToCart(product) {
    // .find() searches the cart and returns the first item matching this id
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // product already in cart — increase its quantity by 1
      // .map() returns a new array, never mutate state directly
      // ternary: if id matches, spread copy and update quantity, else return unchanged
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // product not in cart yet — add it with quantity 1
      // spread ...cart keeps existing items, spread ...product copies all product properties
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  // FUNCTION: updates quantity of a specific cart item
  // if new quantity drops to 0 or below, remove the item entirely
  function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      // .map() finds the matching item and updates its quantity
      // all other items are returned unchanged
      setCart(cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  }

  // FUNCTION: removes an item from the cart completely
  // .filter() returns a new array keeping only items whose id does NOT match
  // !== means "not equal to"
  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // FUNCTION: called when order is confirmed on the checkout screen
  // clears the cart, closes checkout modal and closes cart sidebar
  function handleOrderComplete() {
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  }

  return (
    <div className="app">

      {/* Header receives cartCount to show the badge */}
      {/* onCartClick flips isCartOpen between true and false with ! */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
      />

      {/* category filter buttons */}
      {/* categories array is mapped to a button for each unique category */}
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            // ternary adds 'active' class to whichever button matches activeCategory
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* product grid — renders only the filtered products */}
      {/* each ProductCard gets the product data and the addToCart function */}
      <main className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}        // key helps React track list items efficiently
            product={product}       // passes the full product object as a prop
            onAddToCart={addToCart} // passes the function as a prop
          />
        ))}
      </main>

      {/* Cart sidebar — receives everything it needs to display and update the cart */}
      {/* onCheckout opens the checkout modal when the checkout button is clicked */}
      <Cart
        cart={cart}
        isCartOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* checkout modal — only rendered when isCheckoutOpen is true */}
      {/* && means: only render Checkout if isCheckoutOpen is true */}
      {isCheckoutOpen && (
        <Checkout
          cart={cart}
          cartTotal={cartTotal}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderComplete={handleOrderComplete}
        />
      )}

    </div>
  );
}

export default App;