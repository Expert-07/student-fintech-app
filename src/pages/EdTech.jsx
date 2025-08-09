

import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { p } from "framer-motion/client";
import { Link } from "react-router-dom";


export default function EdTechToolsPage() {
  const tools = [
    {
      title: "Smart Timetable",
      description: "Auto-reminder system based on your class schedule.",
      icon: "🕒",
      link: "/timetable"
    },
    {
      title: "Flashcards",
      description: "Quickly review concepts using AI-generated flashcards.",
      icon: "📇",
      link: ""
    },
    {
      title: "Past Questions Bank",
      description: "Access curated past exam/test questions for your courses.",
      icon: "📚",
      link: ""
    },
    {
      title: "Study Planner",
      description: "Create a personalized study schedule based on your weak spots.",
      icon: "📅",
      link: ""
    },
    {
      title: "Course Notes",
      description: "Find summarized and detailed notes for your registered courses.",
      icon: "📝",
      link: ""
    },
    {
      title: "Lecture Recordings",
      description: "Rewatch missed lectures or revise easily.",
      icon: "🎥",
      link: ""
    },
  ];

  return (
    <div className="min-h-screen px-4 py-10 bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          📘 EdTech Tools & Study Resources
        </h1>
        <p className="text-center mb-10 text-[#94A3B8]">
          Enhance your learning with our tailored academic tools and resources.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-[#1E293B] hover:bg-[#334155] transition-colors duration-300 p-6 rounded-2xl shadow-lg"
            >
              <Link to={tool.link}>
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
              <p className="text-[#CBD5E1] text-sm">{tool.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}