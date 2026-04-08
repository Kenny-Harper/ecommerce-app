import { useState } from 'react';

// TransactionForm — lets the user add a new income or expense
// receives onAdd function from App via props
function TransactionForm({ onAdd }) {

  // all form fields stored in one state object
  // same pattern as the checkout form in the ecommerce app
  const [form, setForm] = useState({
    text: '',        // description e.g. "Salary" or "Rent"
    amount: '',      // number value
    type: 'income',  // 'income' or 'expense'
    category: 'General', // spending category
    date: new Date().toISOString().slice(0, 10), // today's date as YYYY-MM-DD
  });

  // all available categories for the dropdown
  const categories = [
    'General', 'Food', 'Transport', 'Housing',
    'Entertainment', 'Health', 'Shopping', 'Salary', 'Other'
  ];

  // FUNCTION: handles any input change
  // uses input's name attribute to know which field to update
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // FUNCTION: handles form submission
  function handleSubmit(e) {
    e.preventDefault(); // prevents page refresh on submit

    // basic validation — don't allow empty text or zero amount
    if (!form.text.trim() || !form.amount || Number(form.amount) <= 0) return;

    // call onAdd with the form data
    // Number() converts the amount string to a proper number
    onAdd({
      ...form,
      amount: Number(form.amount),
    });

    // reset form after submission but keep type and date
    setForm({
      text: '',
      amount: '',
      type: form.type,
      category: 'General',
      date: form.date,
    });
  }

  return (
    <div className="form-card">
      <h2>Add Transaction</h2>

      {/* type toggle — switches between income and expense */}
      <div className="type-toggle">
        <button
          className={form.type === 'income' ? 'active income' : ''}
          onClick={() => setForm({ ...form, type: 'income' })}
        >
          Income
        </button>
        <button
          className={form.type === 'expense' ? 'active expense' : ''}
          onClick={() => setForm({ ...form, type: 'expense' })}
        >
          Expense
        </button>
      </div>

      {/* form fields */}
      <div className="form-group">
        <label>Description</label>
        <input
          name="text"
          value={form.text}
          onChange={handleChange}
          placeholder="e.g. Salary, Rent, Groceries"
        />
      </div>

      <div className="form-group">
        <label>Amount (£)</label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        {/* select is a dropdown — maps categories array to option elements */}
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      {/* submit button — colour changes based on income or expense */}
      <button
        className={`submit-btn ${form.type === 'income' ? 'income' : 'expense'}`}
        onClick={handleSubmit}
      >
        Add {form.type === 'income' ? 'Income' : 'Expense'}
      </button>
    </div>
  );
}

export default TransactionForm;