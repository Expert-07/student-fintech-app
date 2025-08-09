import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const navItems = ['Home', 'Expenses', 'Timetable', 'Reminders', 'Contact'];
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="fixed
        top-0
        w-full
        z-50
        shadow-sm
        bg-white/80
        dark:bg-gray-900/10
        backdrop-blur
        left-0
        ">
            <div className="max-w-6xl mx-auto px-9 py-3 flex justify-between items-center">
                <h1 className="text-xl text-slate-600 dark:text-gray-400 px-2">{"Student Assist"}</h1>
                <ul className="hidden md:flex space-x-6 font-medium">
                    {navItems.map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
                {/* mobile view */}
                <div className="md:hidden">
                    <AnimatePresence>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            className="z-50"
                        >
                            <HamburgerMenu isOpen={menuOpen} />
                        </button>
                        {menuOpen && (
                            <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: "auto" }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900/20 duration-700 backdrop-blur-md shadow-lg rounded-lg p-4 space-y-2"
                            >
                                {navItems.map((item) => (
                                    <li key={item}>
                                        <a
                                            href={`#${item.toLowerCase()}`}
                                            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
}