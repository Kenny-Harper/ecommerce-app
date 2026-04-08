// Product data — stored separately to keep App.jsx clean
// In a real app this would come from an API call using fetch()
// Each product has:
// id     — unique identifier used as React key and for cart matching
// name   — display name shown on the card
// price  — number, formatted to 2 decimal places in the components
// category — used to generate filter buttons dynamically
// image  — emoji used as a placeholder instead of real image files
const products = [
  { id: 1, name: 'Running Shoes', price: 89.99, category: 'Footwear', image: '👟' },
  { id: 2, name: 'Hoodie', price: 49.99, category: 'Clothing', image: '👕' },
  { id: 3, name: 'Backpack', price: 69.99, category: 'Accessories', image: '🎒' },
  { id: 4, name: 'Sunglasses', price: 29.99, category: 'Accessories', image: '🕶️' },
  { id: 5, name: 'Water Bottle', price: 19.99, category: 'Accessories', image: '🍶' },
  { id: 6, name: 'Joggers', price: 44.99, category: 'Clothing', image: '👖' },
];

export default products;