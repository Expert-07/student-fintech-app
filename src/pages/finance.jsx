import React, { useEffect, useRef, useState } from "react";
import "../css/finance.css" ;
//import { Link } from "react-router-dom";
//import MonthlySummary from "./MonthlySummary";
//import BudgetSuggestions from "./BudgetSuggestions";
import Expenses from "./Expenses";
import {jwtDecode} from "jwt-decode";
import SideBar from "./SideBar";
import useWeeklySummary from "./useWeeklySummary";
import BudgetSuggestions from "./BudgetSuggestions";

const expenseCategories = [
  "Food",
  "Transportation",
  "Housing",
  "Entertainment",
  "Education",
  "Shopping",
  "Other",
];

export default function Finance() {
  const spendingChartRef = useRef(null);
  const incomeExpenseChartRef = useRef(null);
  const [wallet, setWallet] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showTopup, setShowTopup] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");
  const [topupLoading, setTopupLoading] = useState(false);
  const [topupError, setTopupError] = useState("");
  const [savingsRate, setSavingsRate] = useState(null);
  const [savingsRateLoading, setSavingsRateLoading] = useState(true);
  const [savingsRateError, setSavingsRateError] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [monthlyIncomeLoading, setMonthlyIncomeLoading] = useState(true);
  const [monthlyIncomeError, setMonthlyIncomeError] = useState("");

  // Top-up handler (now adds to incomes table, not wallet)
  const handleTopup = async (e) => {
    e.preventDefault();
    setTopupLoading(true);
    setTopupError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/incomes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(topupAmount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Add income failed");
      setShowTopup(false);
      setTopupAmount("");
      // Refresh monthly income after adding new income
      fetchMonthlyIncome();
      alert("Income added successfully!");
    } catch (err) {
      setTopupError(err.message);
    } finally {
      setTopupLoading(false);
    }
  };
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetForm, setBudgetForm] = useState({ category: '', limit_amount: '' });
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [budgetError, setBudgetError] = useState('');
  // Handle budget form input
  const handleBudgetChange = (e) => {
    setBudgetForm({ ...budgetForm, [e.target.name]: e.target.value });
  };

  // Submit new budget
  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    setBudgetLoading(true);
    setBudgetError('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: budgetForm.category,
          limit_amount: Number(budgetForm.limit_amount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create budget');
      setShowBudgetModal(false);
      setBudgetForm({ category: '', limit_amount: '' });
      // Optionally, refresh budgets here
    } catch (err) {
      setBudgetError(err.message);
    } finally {
      setBudgetLoading(false);
    }
  };


   const { summary, loading: loadingWeekly } = useWeeklySummary();
  console.log("Weekly summary:", summary);
    
  

  useEffect(() => {
    document.body.classList.add("finance-bg");
    return () => document.body.classList.remove("finance-bg");
  }, []);

  // Chart.js logic placeholder
  useEffect(() => {
    // You can add Chart.js logic here using spendingChartRef and incomeExpenseChartRef
  }, []);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      //setUser(decoded);
      fetchWallet(token);
    }, []);


  const fetchWallet = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setWallet(data);
      } else {
        console.error("Error fetching wallet:", data.message);
      }
    } catch (err) {
      console.error("Fetch wallet failed:", err);
    }
  };

  // Fetch savings rate
  useEffect(() => {
    const fetchSavingsRate = async () => {
      setSavingsRateLoading(true);
      setSavingsRateError("");
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/expenses/summary/savings-rate", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch savings rate");
        setSavingsRate(data.savingsRate);
      } catch (err) {
        setSavingsRateError(err.message);
      } finally {
        setSavingsRateLoading(false);
      }
    };
    fetchSavingsRate();
  }, []);

  // Fetch monthly income
  const fetchMonthlyIncome = async () => {
    setMonthlyIncomeLoading(true);
    setMonthlyIncomeError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/incomes/monthly", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch monthly income");
      setMonthlyIncome(data.totalIncome);
    } catch (err) {
      setMonthlyIncomeError(err.message);
    } finally {
      setMonthlyIncomeLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <SideBar/>
      {/* Main Content Area */}
      <main className="main-content">
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <button className="menu-toggle" id="menuToggle">
            <i className="fas fa-bars"></i>
          </button>
          <div className="search-bar" id="searchBar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search transactions..." />
          </div>
          <div className="search-profile">
            <button className="search-toggle" id="searchToggle">
              <i className="fas fa-search"></i>
            </button>
            <div className="profile-dropdown">
              <div className="notification-badge">3</div>
              <img src="https://ui-avatars.com/api/?name=Alex+Johnson&background=00ffff&color=121212" alt="Alex" />
              <span>Satoru Gojo</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </header>
        {/* Finance Tracker Content */}
        <div className="dashboard-content">
          <div className="welcome-section fade-in">
            <h1>Finance Tracker</h1>
            <p>Manage your expenses, track your budget, and achieve your financial goals</p>
          </div>
          {/* Financial Overview */}
          <div className="stats-grid">
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <div className="stat-title">Total Balance</div>
              <div className="stat-value">
                {wallet
                  ? `₦${Number(wallet.balance).toLocaleString('en-NG', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "Loading..."}
              </div>
              <div className="stat-subtext">
                {loadingWeekly && "Loading weekly spend..."}
                {!loadingWeekly && summary && summary.totalSpent !== undefined && (
                  <span>Spent this week: ₦{Number(summary.totalSpent).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                )}
                {!loadingWeekly && (!summary || summary.totalSpent === undefined) && (
                  <span>Weekly spend unavailable</span>
                )}
              </div>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-arrow-up"></i>
              </div>
              <div className="stat-title">Monthly Income</div>
              <div className="stat-value">
                {monthlyIncomeLoading ? "Loading..." :
                  monthlyIncome !== null ? `₦${Number(monthlyIncome).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Unavailable"}
                <button className="ml-1 text-2xl h-[50px] btn btn-outline" onClick={() => setShowTopup(true)}>
                  Top Up
                </button>
              </div>
              <div className="stat-subtext">
                {monthlyIncomeError && <span className="text-red-600">{monthlyIncomeError}</span>}
                {/* Optionally, show income source or analytics here */}
              </div>
              {/* Top-up Modal */}
              {showTopup && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h3 className="text-lg font-bold mb-2">Add Income</h3>
                    <form onSubmit={handleTopup}>
                      <input
                        type="number"
                        min="1"
                        className="w-full p-2 border rounded mb-2 text-red-100 "
                        placeholder="Enter amount (₦)"
                        value={topupAmount}
                        onChange={e => setTopupAmount(e.target.value)}
                        required
                      />
                      {topupError && <div className="text-red-600 mb-2">{topupError}</div>}
                      <div className="flex gap-2 mt-2">
                        <button type="submit" className="btn" disabled={topupLoading}>
                          {topupLoading ? "Adding..." : "Add Income"}
                        </button>
                        <button type="button" className="btn btn-outline" onClick={() => setShowTopup(false)}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-arrow-down"></i>
              </div>
              <div className="stat-title">Monthly Expenses</div>
              <div className="stat-value">
                {/* Dynamically show total monthly expenses in Naira */}
                {loadingWeekly ? 'Loading...' : summary && summary.totalSpent !== undefined
                  ? `₦${Number(summary.totalSpent).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : 'Unavailable'}
              </div>
              <div className="stat-subtext">
                {/* Optionally, show delta from last month if available */}
                {summary && summary.deltaFromLastMonth !== undefined
                  ? `${summary.deltaFromLastMonth >= 0 ? '+' : ''}₦${Number(summary.deltaFromLastMonth).toLocaleString('en-NG', { minimumFractionDigits: 2 })} from last month`
                  : ''}
                {loadingWeekly && "Loading weekly spend..."}
                {!loadingWeekly && summary && summary.totalSpent !== undefined && (
                  <span>Spent this week: ₦{Number(summary.totalSpent).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                )}
                {!loadingWeekly && (!summary || summary.totalSpent === undefined) && (
                  <span>Weekly spend unavailable</span>
                )}
              </div>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-piggy-bank"></i>
              </div>
              <div className="stat-title">Savings Rate</div>
              <div className="stat-value">
                {savingsRateLoading ? "Loading..." :
                  savingsRate !== null ? `${savingsRate}%` : "Unavailable"}
              </div>
              <div className="stat-subtext">
                {savingsRateError && <span className="text-red-600">{savingsRateError}</span>}
                {/* Optionally, show more info here */}
              </div>
            </div>
          </div>
          <div className="finance-grid">
            {/* Transactions */}
            <Expenses/>
            {/* Budget Management */}
            <div className="finance-section fade-in">
              <div className="section-title">
                <h2><i className="fas fa-chart-pie"></i> Budget Management</h2>
                <button className="btn ml-6" onClick={() => setShowBudgetModal(true)}>
                  <i className="fas fa-plus"></i> New Budget
                </button>
                {/* Budget Modal */}
                {showBudgetModal && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <h3 className="text-lg font-bold mb-2">Create New Budget</h3>
                      <form onSubmit={handleBudgetSubmit}>
                        <div className="form-group mb-2">
                          <label htmlFor="budgetCategory">Category</label>
                          <select
                            id="budgetCategory"
                            name="category"
                            value={budgetForm.category}
                            onChange={handleBudgetChange}
                            required
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select category</option>
                            {expenseCategories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="budgetLimit">Limit Amount (₦)</label>
                          <input
                            type="number"
                            id="budgetLimit"
                            name="limit_amount"
                            value={budgetForm.limit_amount}
                            onChange={handleBudgetChange}
                            required
                            className="w-full p-2 border rounded"
                            min="0"
                          />
                        </div>
                        {budgetError && <div className="text-red-600 mb-2">{budgetError}</div>}
                        <div className="flex gap-2 mt-4">
                          <button type="submit" className="btn" disabled={budgetLoading}>
                            {budgetLoading ? 'Saving...' : 'Save Budget'}
                          </button>
                          <button type="button" className="btn btn-outline" onClick={() => setShowBudgetModal(false)}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              <BudgetSuggestions/>
            </div>
            {/* Financial Charts */}
            <div className="finance-section fade-in">
              <div className="section-title">
                <h2><i className="fas fa-chart-line"></i> Financial Analytics</h2>
              </div>
              <div className="chart-container">
                <div className="chart-header">
                  <h3>Spending by Category</h3>
                  <select className="time-filter">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
                <canvas ref={spendingChartRef} id="spendingChart"></canvas>
              </div>
              <div className="chart-container">
                <div className="chart-header">
                  <h3>Income vs Expenses</h3>
                  <select className="time-filter">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>All Time</option>
                  </select>
                </div>
                <canvas ref={incomeExpenseChartRef} id="incomeExpenseChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
