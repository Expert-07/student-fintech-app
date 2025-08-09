// src/components/BudgetSuggestions.jsx
import React, { useEffect, useState } from 'react';

const budgetLimits = {
  Food: 5000,
  Transport: 4000,
  Books: 3000,
};

const BudgetSuggestions = () => {
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
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
        console.error('Error fetching summaries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, [token]);

  const generateSuggestions = (summary, period) => {
    if (!summary || !summary.categoryBreakdown) return [];

    return summary.categoryBreakdown.map(item => {
      const spent = parseFloat(item.total);
      const limit = budgetLimits[item.category] || 0;

      if (limit === 0) return `No budget set for ${item.category} in this ${period}.`;

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
    <div className=" p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Budget Suggestions
      </h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <>
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
    </div>
  );
};

export default BudgetSuggestions;