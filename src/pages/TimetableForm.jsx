import { useState } from 'react';

const TimetableForm = () => {
  const [form, setForm] = useState({
    course_name: '',
    day_of_the_week: '',
    start_time: '',
    end_time: '',
    location: '',
    lecturer: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/timetable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Timetable entry added!');
        setForm({
        course_name: '',
        day_of_the_week: '',
        start_time: '',
        end_time: '',
        location: '',
        lecturer: ''
        });
      } else {
        alert(data.message || 'Failed to add entry');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold">Add Timetable Entry</h2>

      <input
        type="text"
        name="course_name"
        placeholder="Course Name"
        value={form.course_name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="day_of_the_week"
        value={form.day_of_the_week}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Day</option>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <input
        type="time"
        name="start_time"
        value={form.start_time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="time"
        name="end_time"
        value={form.end_time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location (optional)"
        value={form.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="lecturer_name"
        placeholder="Lecturer Name (optional)"
        value={form.lecturer_name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Add to Timetable
      </button>
    </form>
  );
};

export default TimetableForm;