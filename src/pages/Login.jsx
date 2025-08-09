import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const responseData = await res.json();

      if (!res.ok) {
        alert(responseData.message || "Login failed");
      } else {
        console.log("Login successful. Token:", responseData.token);
        console.log("Saved token: ", localStorage.getItem("token"));
        
        localStorage.setItem("token", responseData.token); // ✅ Store token
        navigate("/dashboardtemp"); // ✅ Navigate without reloading
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong.");
    }

    console.log("Logging in:", form);
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login to your account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 mt-4 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-600 rounded hover:bg-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}