import React, { useState } from "react";

export default function TopUpForm({ onTopupSuccess }) {
  const [amount, setAmount] = useState("");

  const handleTopup = async () => {
    const token = localStorage.getItem("token");
    if (!amount) return;

    try {
      const res = await fetch("http://localhost:5000/api/wallet/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Top-up successful!");
        setAmount("");
        onTopupSuccess(); // 🔁 Refresh wallet in Dashboard
      } else {
        alert(data.message || "Top-up failed");
      }
    } catch (err) {
      console.error("Top-up error:", err);
    }
  };

  return (
    <div className="mt-6">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-3 rounded bg-slate-700 focus:outline-none"
      />
      <button
        onClick={handleTopup}
        className="ml-4 px-6 py-3 bg-green-600 rounded hover:bg-green-500"
      >
        Top Up Wallet
      </button>
    </div>
  );
}