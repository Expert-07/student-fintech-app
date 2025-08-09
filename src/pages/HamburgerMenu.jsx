import { button } from "framer-motion/client";
import { useState } from "react";

export default function HamburgerMenu({isOpen}) {
   // const[isOpen, setIsOpen] = useState(false);

    return(
        <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-7 flex flex-col justify-between items-center group" aria-label="Toggle Menu"
        
        >
            <span
            className={`block h-[4px] w-full bg-white rounded transition-transform duration-300  dark:bg-white ease-in-out absolute ${isOpen ? "rotate-45 top-1/2 -translate-y-1/2"  : "top-1" }`} />
                <span
                    className={`block h-[4px] w-6 bg-white rounded transition-transform duration-300  dark:bg-white ease-in-out absolute ${isOpen ? "opacity-0" : "top-1/2 -translate-y-1/2" }`} />
                <span
                    className={`block h-[4px] w-4 bg-white rounded transition-transform duration-300  dark:bg-white ease-in-out absolute ${isOpen ? "-rotate-45 top-1/2 -translate-y-1/2 w-7" : "bottom-1" }`} />

        </button>
    )
}