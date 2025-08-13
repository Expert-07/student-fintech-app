// src/components/BudgetSuggestions.jsx
import React, { useEffect, useState } from 'react';

// Animated progress bar as a child component to avoid hook errors
function AnimatedProgressBar({ percent }) {
  const [animatedPercent, setAnimatedPercent] = React.useState(percent);
  React.useEffect(() => {
    setAnimatedPercent(percent);
  }, [percent]);
  // Color logic matches parent
  let color = '#00ccff';
  let boxShadow = '0 0 8px #00ccff';
  if (percent > 100) {
    color = '#dc2626';
    boxShadow = '0 0 8px #dc2626';
  } else if (percent > 80) {
    color = '#f59e42';
    boxShadow = '0 0 8px #f59e42';
  }
  return (
    <div className="progress-bar" style={{ background: '#e5e7eb', borderRadius: 8, overflow: 'hidden', height: 12 }}>
      <div
        className="progress-fill"
        style={{
          width: `${animatedPercent}%`,
          background: color,
          height: '100%',
          borderRadius: 8,
          transition: 'width 0.7s cubic-bezier(.4,2,.6,1)',
          boxShadow
        }}
      ></div>
    </div>
  );
}

const BudgetSuggestions = () => {
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [budgetLimits, setBudgetLimits] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch budget limits
        const budgetRes = await fetch('http://localhost:5000/api/budget/summary', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const budgetData = await budgetRes.json();
        // Convert to { category: limit_amount }
        const limits = {};
        if (Array.isArray(budgetData)) {
          budgetData.forEach(b => {
            if (b.category) {
              limits[b.category.toLowerCase().trim()] = b.limit_amount;
            }
          });
        }
        setBudgetLimits(limits);

        // Fetch summaries
        const [monthlyRes, weeklyRes] = await Promise.all([
          fetch('http://localhost:5000/api/expenses/summary/monthly', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/expenses/summary/weekly', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const monthlyData = await monthlyRes.json();
        const weeklyData = await weeklyRes.json();
        setMonthlySummary(monthlyData);
        setWeeklySummary(weeklyData);
      } catch (err) {
        console.error('Error fetching summaries or budgets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token]);

  const generateSuggestions = (summary, period) => {
    if (!summary || !summary.categoryBreakdown) return [];

    return summary.categoryBreakdown.map(item => {
      const spent = parseFloat(item.total);
      const catKey = item.category ? item.category.toLowerCase().trim() : '';
      const limit = budgetLimits[catKey] || 0;

      if (!limit || isNaN(limit)) return `No budget set for ${item.category} in this ${period}.`;

      const percent = (spent / limit) * 100;

      if (percent > 100) {
        return `⚠️ Overspent on ${item.category} by ₦${(spent - limit).toFixed(2)} this ${period}.`;
      } else if (percent > 80) {
        return `⚠️ Used ${Math.round(percent)}% of your ${item.category} budget this ${period}.`;
      } else if (percent < 40) {
        return `✅ ${item.category} spending is low this ${period}. Great job!`;
      } else {
        return `ℹ️ ${item.category} is within budget this ${period}.`;
      }
    });
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Budget Suggestions
      </h2>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <>
          {/* Show available budget categories for debug */}
          <div className="mb-2 text-xs text-gray-500">
            <strong>Available budget categories:</strong> {Object.keys(budgetLimits).join(', ') || 'None'}
          </div>
          {/* Monthly Section */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100 mb-2">
              Monthly Overview
            </h3>
            <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-200">
              {generateSuggestions(monthlySummary, 'month').map((msg, idx) => (
                <li key={`month-${idx}`}>{msg}</li>
              ))}
            </ul>
          </div>

          {/* Weekly Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100 mb-2">
              Weekly Overview
            </h3>
            <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-200">
              {generateSuggestions(weeklySummary, 'week').map((msg, idx) => (
                <li key={`week-${idx}`}>{msg}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      {/* Dynamic Budget Summary Cards */}
      <div className="budget-cards">
        {Array.isArray(Object.entries(budgetLimits)) && Object.entries(budgetLimits).length > 0 && monthlySummary && monthlySummary.categoryBreakdown && monthlySummary.categoryBreakdown.map((item, idx) => {
          const catKey = item.category ? item.category.toLowerCase().trim() : '';
          const limit = budgetLimits[catKey] || 0;
          const spent = parseFloat(item.total);
          const percent = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0;
          const remaining = limit - spent;
          let state = "";
          let stateIcon = null;
          let stateColor = "";
          if (remaining < 0) {
            state = `${Math.abs(percent)}% over budget`;
            stateIcon = <i className="fas fa-exclamation-triangle me-1 text-danger"></i>;
            stateColor = "text-danger";
          } else if (remaining <= limit * 0.2) {
            state = `${percent}% used`;
            stateIcon = <i className="fas fa-exclamation-triangle me-1 text-danger"></i>;
            stateColor = "text-danger";
          } else {
            state = "On track";
            stateIcon = <i className="fas fa-check-circle me-1 text-success"></i>;
            stateColor = "text-success";
          }

          return (
            <div key={idx} className="budget-card fade-in">
              <div className="budget-header">
                <div className="budget-title">{item.category}</div>
                <div className="budget-amount">₦{Number(limit).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="progress-container">
                <div className="progress-info">
                  <span>Spent: ₦{Number(spent).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                  <span>Remaining: ₦{Number(remaining).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                </div>
                <AnimatedProgressBar percent={percent} key={`progress-bar-${idx}`} />
              </div>
              <div className={`budget-meta ${stateColor}`}>
                <span>{stateIcon} {state}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Example static savings goal card (optional, can be removed if not needed) */}
      <div className="section-title" style={{ marginTop: "2rem" }}>
        <h2><i className="fas fa-bullseye"></i> Savings Goals</h2>
      </div>
      <div className="budget-card fade-in">
        <div className="budget-header">
          <div className="budget-title">New Laptop Fund</div>
          <div className="budget-amount">$500</div>
        </div>
        <div className="progress-container">
          <div className="progress-info">
            <span>Saved: $325</span>
            <span>Remaining: $175</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "65%" }}></div>
          </div>
        </div>
        <div className="budget-meta">
          <span><i className="fas fa-calendar me-1"></i> Target: Aug 30, 2023</span>
          <span><i className="fas fa-coins me-1"></i> $35/week</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetSuggestions;