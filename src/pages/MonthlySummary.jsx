// src/components/MonthlySummary.jsx
import React, { useEffect, useState } from 'react';

const MonthlySummary = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Adjust if you store it elsewhere

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/expenses/summary/monthly', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setSummary(data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [token]);

  return (
    <div className='relative left-0 w-full'>

  <p className="text-sm text-gray-500 dark:text-[#F8FAFC]">Expenses This Month</p>
  <p className="text-lg font-bold">₦{parseFloat(summary.totalSpent)}</p>
  
      
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <>
            <p className="text-gray-700 dark:text-gray-200 font-medium">
            </p>
          <div>
           {/* <h3 className="text-md font-medium text-gray-700 dark:text-white mb-2">By Category:</h3>*/}
           {/*summary.categoryBreakdown.length > 0 ? (
              <ul className="space-y-2">
                {summary.categoryBreakdown.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>{item.category}</span>
                    <span>₦{item.total}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No data yet.</p>
            )*/}
          </div>
        </>
      )}

    </div>
  );
};

export default MonthlySummary;