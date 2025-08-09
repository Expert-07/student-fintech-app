import React, { useEffect, useState } from 'react';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <button>
        🔔 {notifications.filter(n => !n.is_read).length}
      </button>
      <div>
        {notifications.map(n => (
          <div key={n.id} style={{ background: n.is_read ? '#eee' : '#cce' }}>
            <p>{n.message}</p>
            <small>{new Date(n.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;