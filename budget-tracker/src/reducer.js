// the reducer is a function that takes the current state and an action
// and returns the NEW state
// it never mutates state directly — always returns a brand new object
// this is the core pattern of useReducer

// our initial state — what the app looks like when it first loads
export const initialState = {
  transactions: [], // array of all income and expense entries
  currentMonth: new Date().toISOString().slice(0, 7), // e.g. "2026-04"
};

// the reducer function — a switch statement that handles each action type
// action is an object like { type: 'ADD_TRANSACTION', payload: { ... } }
// payload is the data that comes with the action
export function reducer(state, action) {
  switch (action.type) {

    // ADD_TRANSACTION: adds a new transaction to the list
    case 'ADD_TRANSACTION':
      return {
        ...state, // spread existing state to keep everything else
        transactions: [...state.transactions, action.payload],
      };

    // DELETE_TRANSACTION: removes a transaction by id
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t.id !== action.payload
        ),
      };

    // SET_MONTH: changes which month is being viewed
    case 'SET_MONTH':
      return {
        ...state,
        currentMonth: action.payload,
      };

    // default: if action type is unknown, return state unchanged
    default:
      return state;
  }
}