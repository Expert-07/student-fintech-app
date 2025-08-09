import { Link } from 'react-router-dom';
import React  from 'react';
export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white px-6 py-10">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">StudentSync</h1>
        <div>
          <Link to="/login" className="text-white hover:underline mr-4">Login</Link>
          <Link to="/register" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Sign Up</Link>
        </div>
      </header>

      <main className="mt-20 text-center">
        <h2 className="text-5xl font-extrabold leading-tight">Track Your Finances. <br /> Stay On Track Academically.</h2>
        <p className="mt-4 text-lg text-slate-300">A smart platform built for students by students.</p>
        <Link to="/register">
          <button className="mt-8 bg-blue-600 px-6 py-3 text-lg rounded-full hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </main>

      <section className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
        <Feature title="💰 Finance Tracker" desc="Log and manage expenses, savings goals, and budgets." />
        <Feature title="🧠 Academic Reminders" desc="Set up alerts based on your school timetable." />
        <Feature title="🗺️ Campus Map" desc="Find buildings, hostels, and more with ease." />
      </section>

      <footer className="mt-20 text-center text-sm text-slate-400">
        &copy; 2025 StudentSync. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-300">{desc}</p>
    </div>
  );
}