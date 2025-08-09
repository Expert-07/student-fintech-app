import React, { useEffect, useState } from 'react';
import BottomNav from './BottomNav';

const SmartReminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    let intervalId;

    const fetchReminders = async () => {
      const token = localStorage.getItem('token'); // adjust if you store elsewhere
      const userId = localStorage.getItem('userId');

      if (!token) {
        console.error("Token not found");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/timetable/upcoming/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Failed to fetch reminders:', errorData.message);
          return;
        }

        const data = await res.json();
        console.log('Fetched reminders:', data);

        if (data && !data.message) {
          if (reminders.length > 0 && reminders[0].id !== data.id) {
            // New reminder detected
            if (onNewReminder) onNewReminder("You have a new upcoming class reminder!");
          }
          setReminders([data]);
        } else {
          setReminders([]);
        }
      } catch (err) {
        console.error('Error fetching reminders:', err);
      }
    };

    fetchReminders();
    intervalId = setInterval(fetchReminders, 120000); // Poll every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {reminders.length === 0 ? (
        <p>No upcoming classes</p>
      ) : (
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id} className="mb-2 border p-2 rounded">
              <div className="font-bold">{reminder.course_name || reminder.activity}</div>
              <div>{reminder.date} @ {reminder.start_time}</div>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default SmartReminders;