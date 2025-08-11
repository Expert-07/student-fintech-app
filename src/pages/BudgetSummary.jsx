import React, { useState, useEffect } from 'react';

export default function BudgetSummary() {
  const [budget, setBudget] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Fetch budget summary
  const fetchBudgetSummary = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/budget/summary', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch budget summary');
      const data = await res.json();
      setBudget(data);
    } catch (err) {
      console.error('Error fetching budget summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetSummary();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Budget Summary</h2>
      <div className="budget-cards">
        {Array.isArray(budget) && budget.map((b, idx) => {
          const percent = b.limit_amount > 0 ? Math.min(100, Math.round((b.total_spent / b.limit_amount) * 100)) : 0;
          const remaining = b.limit_amount - b.total_spent;
          let state = "";
          let stateIcon = null;
          let stateColor = "";
          if (remaining < 0) {
            state = `${Math.abs(percent)}% over budget`;
            stateIcon = <i className="fas fa-exclamation-triangle me-1 text-danger"></i>;
            stateColor = "text-danger";
          } else if (remaining <= b.limit_amount * 0.2) {
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
                <div className="budget-title">{b.category}</div>
                <div className="budget-amount">₦{Number(b.limit_amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="progress-container">
                <div className="progress-info">
                  <span>Spent: ₦{Number(b.total_spent).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                  <span>Remaining: ₦{Number(remaining).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(percent, 100)}%`, background: percent > 100 ? '#dc2626' : percent > 80 ? '#f59e42' : '#2563eb' }}></div>
                </div>
              </div>
              <div className={`budget-meta ${stateColor}`}>
                <span>{stateIcon} {state}</span>
                {/* You can add an end date or other info here if available */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}