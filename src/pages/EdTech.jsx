

import React from "react";
import { motion } from "framer-motion";
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
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          📘 EdTech Tools & Study Resources
        </motion.h1>
        <motion.p
          className="text-center mb-10 text-[#94A3B8]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Enhance your learning with our tailored academic tools and resources.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="bg-[#1E293B] hover:bg-[#334155] transition-colors duration-300 p-6 rounded-2xl shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 * index, ease: "easeOut" }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(0,255,255,0.15)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to={tool.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {tool.icon}
                </motion.div>
                <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
                <p className="text-[#CBD5E1] text-sm">{tool.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}