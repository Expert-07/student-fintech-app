import React, { useEffect, useState } from 'react';
import "../css/finance.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', category: '' });
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="p-4 max-w-xl mx-auto text-black">
      <h2 className="text-xl font-semibold mb-4">Expenses</h2>

{/*      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>*/}

      <ul className="space-y-2">
        {expenses.map((exp) => (
          <li
            key={exp.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">{exp.title} - ₦{exp.amount}</p>
              <small className="text-gray-600">{exp.category}</small>
            </div>
            <button
              onClick={() => handleDelete(exp.id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
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
          <li className="transaction-item expense fade-in">
            <div className="transaction-icon">
              <i className="fas fa-utensils"></i>
            </div>
            <div className="transaction-details">
              <div className="transaction-title">Campus Cafe</div>
              <div className="transaction-category">Food</div>
              <div className="transaction-meta">
                <div className="transaction-amount">-$12.50</div>
                <div className="transaction-date">Today, 12:30 PM</div>
              </div>
            </div>
          </li>
          <li className="transaction-item income fade-in">
            <div className="transaction-icon">
              <i className="fas fa-money-check"></i>
            </div>
            <div className="transaction-details">
              <div className="transaction-title">Part-time Job</div>
              <div className="transaction-category">Salary</div>
              <div className="transaction-meta">
                <div className="transaction-amount">+$300.00</div>
                <div className="transaction-date">Yesterday, 9:00 AM</div>
              </div>
            </div>
          </li>
          <li className="transaction-item expense fade-in">
            <div className="transaction-icon">
              <i className="fas fa-book"></i>
            </div>
            <div className="transaction-details">
              <div className="transaction-title">Textbooks</div>
              <div className="transaction-category">Education</div>
              <div className="transaction-meta">
                <div className="transaction-amount">-$85.75</div>
                <div className="transaction-date">Jul 15, 2023</div>
              </div>
            </div>
          </li>
          <li className="transaction-item expense fade-in">
            <div className="transaction-icon">
              <i className="fas fa-train"></i>
            </div>
            <div className="transaction-details">
              <div className="transaction-title">Bus Pass</div>
              <div className="transaction-category">Transportation</div>
              <div className="transaction-meta">
                <div className="transaction-amount">-$45.00</div>
                <div className="transaction-date">Jul 10, 2023</div>
              </div>
            </div>
          </li>
        </ul>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button className="btn btn-outline">
            <i className="fas fa-history"></i> View All Transactions
          </button>
        </div>
      </div>
    </div>


  );
};

export default Expenses;
