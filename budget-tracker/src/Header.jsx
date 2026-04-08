// Header component — shows the monthly summary at the top
// receives balance, income and expenses as props from App
function Header({ balance, totalIncome, totalExpenses, currentMonth }) {

  // format the month from "2026-04" to "April 2026" for display
  // new Date() with day 1 creates a valid date we can format
  const formattedMonth = new Date(`${currentMonth}-01`).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="header">
      <h1 className="logo">💰 Budget Tracker</h1>
      <p className="month-label">{formattedMonth}</p>

      {/* three summary cards showing balance, income and expenses */}
      <div className="summary-cards">

        {/* balance card — green if positive, red if negative */}
        <div className={`card balance-card ${balance >= 0 ? 'positive' : 'negative'}`}>
          <p className="card-label">Balance</p>
          <p className="card-amount">£{balance.toFixed(2)}</p>
        </div>

        {/* income card — always green */}
        <div className="card income-card">
          <p className="card-label">Income</p>
          <p className="card-amount">£{totalIncome.toFixed(2)}</p>
        </div>

        {/* expenses card — always red */}
        <div className="card expense-card">
          <p className="card-label">Expenses</p>
          <p className="card-amount">£{totalExpenses.toFixed(2)}</p>
        </div>

      </div>
    </header>
  );
}

export default Header;