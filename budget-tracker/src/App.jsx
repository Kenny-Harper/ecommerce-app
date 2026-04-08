// useReducer is like useState but for more complex state
// instead of setX(value) we call dispatch({ type: 'ACTION', payload: data })
// useEffect runs code when state changes — used here to save to localStorage
// useMemo caches expensive calculations so they only re-run when needed
import { useReducer, useMemo, useEffect } from 'react';

// import our reducer function and the initial state from reducer.js
import { reducer, initialState } from './reducer';
import Header from './Header';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Charts from './Charts';
import MonthPicker from './MonthPicker';

function App() {
  // useReducer takes the reducer function and initial state
  // returns current state and dispatch function
  // dispatch is how we trigger state changes — we never change state directly
  // on first load we check localStorage for saved state
  // if found we use that, otherwise we use initialState
  const [state, dispatch] = useReducer(
    reducer,
    localStorage.getItem('budgetState')
      ? JSON.parse(localStorage.getItem('budgetState'))
      : initialState
  );

  // save entire state to localStorage every time anything changes
  // so all transactions and current month survive a page refresh
  useEffect(() => {
    localStorage.setItem('budgetState', JSON.stringify(state));
  }, [state]);

  // pull out what we need from state for cleaner code
  const { transactions, currentMonth } = state;

  // DERIVED VALUE: only show transactions for the current month
  // useMemo caches this calculation and only re-runs it when
  // transactions or currentMonth changes — good for performance
  const monthlyTransactions = useMemo(() => {
    return transactions.filter((t) => t.date.startsWith(currentMonth));
  }, [transactions, currentMonth]);

  // DERIVED VALUE: total income for the current month
  // filter to only income type, then add up all amounts
  const totalIncome = useMemo(() => {
    return monthlyTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [monthlyTransactions]);

  // DERIVED VALUE: total expenses for the current month
  const totalExpenses = useMemo(() => {
    return monthlyTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [monthlyTransactions]);

  // DERIVED VALUE: balance = income minus expenses
  const balance = totalIncome - totalExpenses;

  // FUNCTION: adds a new transaction
  // dispatch sends the action to the reducer which handles the state update
  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        ...transaction,
        id: Date.now(), // unique id using current timestamp
      },
    });
  }

  // FUNCTION: deletes a transaction by id
  function deleteTransaction(id) {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }

  // FUNCTION: changes the currently viewed month
  // dispatches SET_MONTH action to the reducer
  function setMonth(month) {
    dispatch({ type: 'SET_MONTH', payload: month });
  }

  return (
    <div className="app">
      <Header
        balance={balance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        currentMonth={currentMonth}
      />

      {/* month picker — lets user switch between months */}
      <MonthPicker
        currentMonth={currentMonth}
        onSetMonth={setMonth}
      />

      <div className="main-content">
        <TransactionForm onAdd={addTransaction} />
        <TransactionList
          transactions={monthlyTransactions}
          onDelete={deleteTransaction}
        />
      </div>

      {/* charts — only shows when there are expenses */}
      <Charts
        monthlyTransactions={monthlyTransactions}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />
    </div>
  );
}

export default App;