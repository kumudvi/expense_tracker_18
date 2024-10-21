import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const addExpense = () => {
    const newExpense = { title, amount, date };
    setExpenses([...expenses, newExpense]);
    setTitle('');
    setAmount('');
    setDate('');
  };

  const extendDate = (index) => {
    const newDate = prompt('Enter new date (yyyy-mm-dd):');
    if (newDate) {
      const updatedExpenses = expenses.map((expense, i) =>
        i === index ? { ...expense, date: newDate } : expense
      );
      setExpenses(updatedExpenses);
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const isOverdue = (date) => {
    const expenseDate = new Date(date);
    const currentDate = new Date();
    return expenseDate < currentDate;
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <p>Total Expense: <span id="total-expense">${expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0).toFixed(2)}</span></p>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button onClick={addExpense}>Add Expense</button>
      <div id="expenses">
        {expenses.map((expense, index) => (
          <div key={index} className={`expense-item ${isOverdue(expense.date) ? 'overdue' : ''}`}>
            <span>{`${expense.title} - $${expense.amount} on ${expense.date}`}</span>
            <div className="expense-actions">
              <button onClick={() => extendDate(index)}>Extend Date</button>
              <button onClick={() => deleteExpense(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
