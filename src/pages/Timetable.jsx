import React, { useEffect, useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  // Move fetchTimetable outside useEffect
  const fetchTimetable = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch(`http://localhost:5000/api/timetable/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setTimetable(data || []);
    } catch {
      setTimetable([]);
    }
    setLoading(false);
  };

  // Now handleDelete can access fetchTimetable and token
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/timetable/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete');
      fetchTimetable();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  // Helper: Find class for a day and time slot
  const getClassForSlot = (day, time) => {
    return timetable.find(
      (item) =>
        (typeof item.day_of_the_week === 'string'
          ? item.day_of_the_week
          : daysOfWeek[item.day_of_the_week]) === day &&
        item.start_time.slice(0, 5) === time
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Weekly Timetable</h2>
      {loading ? (
        <p className="text-center">Loading timetable...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border bg-gray-100 dark:bg-[#1E293B]"></th>
                {daysOfWeek.map((day) => (
                  <th key={day} className="p-2 border bg-gray-100 dark:bg-[#1E293B] text-xs md:text-base">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time}>
                  <td className="p-2 border bg-gray-50 dark:bg-[#1E293B] text-xs md:text-base font-semibold">{time}</td>
                  {daysOfWeek.map((day) => {
                    const classItem = getClassForSlot(day, time);
                    return (
                      <td key={day + time} className="p-1 md:p-2 border align-top">
                        {classItem ? (
                          <div className="bg-blue-100 dark:bg-blue-900 rounded p-1 md:p-2 text-xs md:text-sm shadow">
                            <div className="font-bold">{classItem.course_name || classItem.activity}</div>
                            <div>{classItem.start_time} - {classItem.end_time}</div>
                            {classItem.location && (
                              <div className="text-gray-500">{classItem.location}</div>
                            )}
                            {classItem.lecturer && (
                              <div className="text-gray-400 text-xs">Lecturer: {classItem.lecturer}</div>
                            )}
                              <button onClick={() => handleDelete(classItem.id)} className="text-red-400 text-xs">Delete</button>

                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Timetable;