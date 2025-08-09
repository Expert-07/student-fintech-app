import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { p } from "framer-motion/client";
import { Link } from "react-router-dom";
import TimetableForm from "./TimetableForm";
import MonthlySummary from "./MonthlySummary";
import BudgetSuggestions from "./BudgetSuggestions";
import Navbar from "./Navbar";

import { FiMapPin, FiMessageSquare } from "react-icons/fi";
import { MdInsertDriveFile } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import ReminderSystem from "./SmartReminders";
import BottomNav from "./BottomNav";



export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [topupAmount, setTopupAmount] = useState("");
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [remindersCount, setRemindersCount] = useState(0);

  // Get token and decode user ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    setUserId(decoded.id);
    setUser(decoded);
    fetchWallet(token);
  }, []);

  // Fetch Wallet
  const fetchWallet = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setWallet(data);
      } else {
        console.error("Error fetching wallet:", data.message);
      }
    } catch (err) {
      console.error("Fetch wallet failed:", err);
    }
  };

  // Handle Top-Up
  const handleTopup = async () => {
    const token = localStorage.getItem("token");
    if (!topupAmount) return;

    try {
      const res = await fetch("http://localhost:5000/api/wallet/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(topupAmount) }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Wallet topped up successfully!");
        setTopupAmount("");
        fetchWallet(token); // 🔁 Refresh wallet
      } else {
        alert(data.message || "Top-up failed");
      }
    } catch (err) {
      console.error("Top-up failed:", err);
      alert("Top-up error");
    }
  };

  useEffect(() => {
    // Fetch reminders count
    const fetchRemindersCount = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/timetable/today/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setRemindersCount(data.length);
        } else {
          setRemindersCount(0);
        }
      } catch {
        setRemindersCount(0);
      }
    };
    fetchRemindersCount();
  }, []);

  return (
    
      <div className="min-h-screen p-4 py-[100px] text-black font-sans bg-white dark:bg-[#0F172A] dark:text-[#F8FAFC]">
      <h1 className="text-2xl font-bold mb-4 ">
        Welcome back, {user?.name || ""}👋 </h1>
        
        <h1 className="text-3xl font-bold mb-0">  </h1>
      {/*💰*/}
      {/*📅*/}

      {/* Balance + Top-Up */}
        {wallet ? (

      <div className="grid grid-cols-3 gap-3 mb-4">
        
        <div className="border rounded-xl p-4 col-span-2 dark:bg-[#1E293B] border-[#334155]">
          <p className="text-gray-500 dark:text-[#F8FAFC]">Total Savings</p>
          <p className="text-2xl font-bold">₦{Number(wallet.balance).toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</p>
          <button onClick={handleTopup} className="mt-2 px-4 py-2 border rounded-md dark:bg-[#3B82F6] border-[#334155] dark:text-[#F8FAFC]">Top Up</button>
           {wallet ? (

          <div className="mt-6 dark:bg-[#1E293B] border-[#334155]">
            <input
              type="number"
              placeholder="Enter amount"
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
              className="p-3 rounded-lg bg-gray-200 text-black"
            />
          </div>
      ) : (
        <p>Loading wallet info...</p>
      )}
          
        </div>
        <div className="border rounded-xl p-4 flex justify-center items-center dark:bg-[#1E293B] border-[#334155]">
          <button onClick={() => setShowModal(true)} title="Add Timetable Entry">
            <MdInsertDriveFile size={32} />
          </button>
        </div>
      </div>
        ): ( <p>Loading ...</p> )}



        {/* Expenses / Reminders / Next Class */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="border rounded-xl p-4 dark:bg-[#1E293B] border-[#334155]">
        <MonthlySummary />
        </div>
        <div className="border rounded-xl p-4 dark:bg-[#1E293B] border-[#334155]">
          <p className="text-sm text-gray-500 dark:text-[#F8FAFC]">Reminders Today</p>
          <p className="text-lg font-bold">{remindersCount}</p>
        </div>
        <div className="border rounded-xl p-4 dark:bg-[#1E293B] border-[#334155]">
          <p className="text-sm text-gray-500 dark:text-[#F8FAFC]">Next Class</p>
          <p className="text-md font-semibold"><ReminderSystem userId={user?.id} /></p>
        </div>
      </div>



      {/* Smart Wallet History */}
      <div className="border rounded-xl p-4 mb-4 dark:bg-[#1E293B] border-[#334155]">
        <h2 className="text-lg font-semibold mb-2">Smart Wallet</h2>
        <div className="flex justify-between items-center text-sm mb-2">
          <div className="flex items-center gap-2">
            <input type="radio" />
            <span>₦2,000</span>
            <span className="text-gray-500 dark:text-[#94A3B8]">Top-up</span>
          </div>
          <span className="text-gray-500 dark:text-[#94A3B8]">Aug. 2</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <input type="radio" />
            <span>₦500</span>
            <span className="text-gray-500 dark:text-[#94A3B8]">Snack Expense</span>
          </div>
          <span className="text-gray-500 dark:text-[#94A3B8]">Aug. 1</span>

        </div>
      </div>
      <div className="border rounded-xl p-4 mb-4 dark:bg-[#1E293B] border-[#334155]">

      <BudgetSuggestions />

</div>
      {/* EdTech Tools */}
      <Link to="/edtech">
      <div className="border rounded-xl p-4 mb-4  dark:bg-[#1E293B] border-[#334155]">
        <h2 className="text-lg font-semibold mb-2">EdTech Tools</h2>
        <div className="grid grid-cols-2 divide-x">
          <div className="flex items-center gap-2 pr-2">
            <FaRegCalendarAlt />
            <span>Smart Timetable &<Link to="/smartrem"> Reminder</Link></span>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <BsBook />
            <span>Study Resources</span>
          </div>
        </div>
      </div>
      </Link>

      {/* Campus Tools */}
      <div className="border rounded-xl p-4 mb-6  dark:bg-[#1E293B] border-[#334155]">
        <h2 className="text-lg font-semibold mb-2">Campus Tools</h2>
        <div className="grid grid-cols-2 divide-x">
          <div className="flex items-center gap-2 pr-2">
            <FiMapPin />
            <span>View Campus Map</span>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <FiMessageSquare />
            <span>Submit Feedback</span>
          </div>
        </div>
      </div>


      {/* Footer Links */}
      <div className="text-center text-gray-600 text-sm space-x-6 mb-24">
        <button>Settings</button>
        <button>Support</button>
        <button>Logout</button>
      </div>

      {/* Bottom Nav */}
<BottomNav />
<div className="p-4 text-black">
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Timetable Entry
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] max-w-md">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
            <TimetableForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
</div>


     <Link to="/expenses" className="text-blue-400 hover:underline">
                  View Expenses
                </Link>
                <Link to="/timetable" className="text-blue-400 hover:underline">
                  View timetable
                </Link>
    <Navbar />

    
    </div>

    
    
  );
}

