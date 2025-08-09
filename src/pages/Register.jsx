import React from "react";
import { useState } from "react";


export default function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword
      }),
    });

    const data = await res.json();  // ✅ Get backend message

    if (!res.ok) {
      console.error("❌ Backend returned error:", data);
      alert(data.message || "Registration failed");
      return;
    }

    console.log("✅ Registered successfully:", data);
    alert("🎉 Registration successful!");
    // You can redirect here
  } catch (err) {
    console.error("❌ Network/Fetch error:", err);
    alert("Could not connect to server.");
  }
};

    return(
        <div className="min-h-screen bg-blue-900 text-white flex items-center justify-center">
            <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center">Create an account</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring:blue-500" required />
                        <input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-3 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring:blue-500" required/>
                        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full p-3 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring:blue-500" required/>
                        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full p-3 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring:blue-500" required/>
                        <button type="submit" className="w-full p-3 mt-4 bg-blue-600 rounded hover:bg-blue-500">Register</button>
                    </form>
            </div>
        </div>
    )
}