// TransactionList — displays all transactions for the current month
// receives transactions array and delete function from App via props
function TransactionList({ transactions, onDelete }) {

  // if no transactions yet show a friendly empty state message
  if (transactions.length === 0) {
    return (
      <div className="list-card">
        <h2>Transactions</h2>
        <p className="empty-message">No transactions this month yet!</p>
      </div>
    );
  }

  return (
    <div className="list-card">
      <h2>Transactions</h2>

      <ul className="transaction-list">
        {transactions.map((t) => (
          <li key={t.id} className={`transaction-item ${t.type}`}>

            {/* left side — description, category and date */}
            <div className="transaction-info">
              <p className="transaction-text">{t.text}</p>
              <p className="transaction-meta">{t.category} • {t.date}</p>
            </div>

            {/* right side — amount and delete button */}
            <div className="transaction-right">
              {/* + for income, - for expenses */}
              <p className="transaction-amount">
                {t.type === 'income' ? '+' : '-'}£{t.amount.toFixed(2)}
              </p>
              <button
                className="delete-btn"
                onClick={() => onDelete(t.id)}
              >✕</button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;