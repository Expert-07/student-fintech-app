
import { useEffect, useState } from 'react';

export default function useWeeklySummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;
    const fetchSummary = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/expenses/summary/weekly', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error('Failed to fetch weekly summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
        intervalId = setInterval(fetchSummary, 600000); // Poll every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  return { summary, loading };
};