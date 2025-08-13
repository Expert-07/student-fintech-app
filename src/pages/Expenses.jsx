import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../css/finance.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const token = localStorage.getItem('token');

  // Load expenses
  const fetchExpenses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      //   console.log("Fetched expenses:", data);
      console.log('Raw data: ', data);


      setExpenses(data);
    } catch (err) {
      console.error('Failed to load expenses:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);
  useEffect(() => {
    console.log('Fetched expense:', expenses);

  }, [expenses]);
  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to add expense');
      setForm({ title: '', amount: '', category: '' });
      fetchExpenses();
    } catch (err) {
      console.error('Add expense failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete');
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const calculateChartData = () => {
    const income = expenses.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = expenses.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    return {
      labels: ['Income', 'Expenses'],
      datasets: [
        {
          data: [income, expense],
          backgroundColor: ['#4caf50', '#f44336'],
          hoverBackgroundColor: ['#66bb6a', '#e57373'],
        },
      ],
    };
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-black">

      <div className="finance-section fade-in">
        <div className="section-title">
          <h2><i className="fas fa-exchange-alt"></i> Transactions</h2>
        </div>
        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="transactionType">Type</label>
            <select id="transactionType">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="transactionAmount">Amount ($)</label>
            <input type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange} id="transactionAmount" placeholder="Enter amount" />
          </div>
          <div className="form-group">
            <label htmlFor="transactionCategory">Category</label>
            <select id="transactionCategory" type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}>
              <option value="food">Food</option>
              <option value="transport">Transportation</option>
              <option value="housing">Housing</option>
              <option value="entertainment">Entertainment</option>
              <option value="education">Education</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>

          </div>
          <div className="form-group">
            <label htmlFor="transactionDate">Date</label>
            <input type="date" id="transactionDate" />
          </div>
          <div className="form-group">
            <label htmlFor="transactionDescription">Description</label>
            <input type="text" id="transactionDescription"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter description" />
          </div>
          <button type="submit" className="btn btn-full">
            <i className="fas fa-plus"></i> Add Transaction
          </button>
        </form>

        <h3 style={{ marginBottom: "1rem" }}>Recent Transactions</h3>
        <ul className="transaction-list">
          {(showAllTransactions ? expenses : expenses.slice(0, 3)).map((transaction) => (
            <li
              key={transaction.id}
              className={`transaction-item ${transaction.type} fade-in`}
            >
              <div className="transaction-icon">
                <i
                  className={
                    transaction.type === "income"
                      ? "fas fa-money-check"
                      : transaction.category === "Food"
                      ? "fas fa-utensils"
                      : transaction.category === "Education"
                      ? "fas fa-book"
                      : transaction.category === "Transportation"
                      ? "fas fa-train"
                      : "fas fa-exchange-alt"
                  }
                ></i>
              </div>
              <div className="transaction-details">
                <div className="transaction-title">{transaction.title}</div>
                <div className="transaction-category">{transaction.category}</div>
                <div className="transaction-meta">
                  <div className="transaction-amount">
                    {transaction.type === "income" ? "+" : "-"}
                    ₦{Number(transaction.amount).toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="transaction-date">
                    {new Date(transaction.date).toLocaleString("en-NG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            className="btn btn-outline"
            onClick={() => setShowAllTransactions(!showAllTransactions)}
          >
            <i className="fas fa-history"></i> {showAllTransactions ? "Hide Transactions" : "View All Transactions"}
          </button>
        </div>
      </div>

      <div className="chart-container" style={{ marginTop: '2rem' }}>
        <h3>Income vs Expenses</h3>
        <Pie data={calculateChartData()} />
      </div>
    </div>


  );
};

export default Expenses;
