import { useState } from 'react';

// Checkout component — a modal overlay with a two step flow
// Step 1: form (filling in details)
// Step 2: confirmation (order placed successfully)
function Checkout({ cart, cartTotal, onClose, onOrderComplete }) {

  // tracks which step we're on — 'form' or 'confirmation'
  const [step, setStep] = useState('form');

  // stores all the form field values in one object
  // this is a common pattern for handling multiple form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // tracks any validation errors — one error message per field
  const [errors, setErrors] = useState({});

  // FUNCTION: handles input changes for any field
  // uses the input's name attribute to know which field to update
  // ...formData spreads existing values, then overrides just the changed field
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // clear the error for this field as the user types
    setErrors({ ...errors, [name]: '' });
  }

  // FUNCTION: validates all fields before allowing submission
  // returns true if valid, false if there are errors
  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';

    // card number must be exactly 16 digits
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Enter a valid 16 digit card number';
    }

    // expiry must match MM/YY format
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Enter expiry as MM/YY';
    }

    // cvv must be exactly 3 digits
    if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);

    // if newErrors is empty, the form is valid
    return Object.keys(newErrors).length === 0;
  }

  // FUNCTION: handles form submission
  function handleSubmit() {
  const isValid = validate();
  console.log('Valid:', isValid);
  console.log('Errors:', errors);
  if (isValid) {
    setStep('confirmation');
  }
}

  return (
    // dark overlay behind the modal — clicking it closes checkout
    <div className="checkout-overlay" onClick={onClose}>

      {/* stopPropagation stops clicks inside the modal from closing it */}
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>

        {/* STEP 1: the checkout form */}
        {step === 'form' && (
          <>
            <div className="checkout-header">
              <h2>Checkout</h2>
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            {/* scrollable body — form fields first, order summary at the bottom */}
            <div className="checkout-body">

              {/* personal details section */}
              <h3 className="section-title">Personal Details</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Kenny Harper"
                />
                {/* only show error if one exists for this field */}
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="kenny@example.com"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              {/* delivery address section */}
              <h3 className="section-title">Delivery Address</h3>

              <div className="form-group">
                <label>Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                />
                {errors.address && <p className="error">{errors.address}</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="London"
                  />
                  {errors.city && <p className="error">{errors.city}</p>}
                </div>

                <div className="form-group">
                  <label>Postcode</label>
                  <input
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    placeholder="SW1A 1AA"
                  />
                  {errors.postcode && <p className="error">{errors.postcode}</p>}
                </div>
              </div>

              {/* payment details section */}
              <h3 className="section-title">Payment Details</h3>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiry && <p className="error">{errors.expiry}</p>}
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={3}
                  />
                  {errors.cvv && <p className="error">{errors.cvv}</p>}
                </div>
              </div>

              {/* order summary at the bottom of the form */}
              <h3 className="section-title">Order Summary</h3>
              <div className="order-summary">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>{item.image} {item.name} x{item.quantity}</span>
                    <span>£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="summary-total">
                  <strong>Total: £{cartTotal}</strong>
                </div>
              </div>

            </div>

            {/* place order button pinned to bottom — runs validation before proceeding */}
            <div className="checkout-footer">
              <button className="place-order-btn" onClick={handleSubmit}>
                Place Order — £{cartTotal}
              </button>
            </div>
          </>
        )}

        {/* STEP 2: order confirmation screen */}
        {step === 'confirmation' && (
          <div className="confirmation">
            <div className="confirmation-icon">✅</div>
            <h2>Order Confirmed!</h2>
            {/* .split(' ')[0] grabs just the first name from the full name */}
            <p>Thanks {formData.name.split(' ')[0]}, your order is on its way.</p>
            <p className="confirmation-email">
              Confirmation sent to <strong>{formData.email}</strong>
            </p>

            {/* summary of what was ordered */}
            <div className="order-summary">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.image} {item.name} x{item.quantity}</span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="summary-total">
                <strong>Total paid: £{cartTotal}</strong>
              </div>
            </div>

            {/* onOrderComplete clears the cart and closes checkout */}
            <button className="place-order-btn" onClick={onOrderComplete}>
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Checkout;