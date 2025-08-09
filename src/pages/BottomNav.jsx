import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiMessageSquare } from "react-icons/fi";
import { MdInsertDriveFile } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBook } from "react-icons/bs";

export default function BottomNav() {
return (
    <>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 text-gray-600  dark:bg-[#1E293B] border-[#334155]">
        <button>
          <svg width="24" height="24" fill="none"><path d="M..." /></svg>
        </button>
        <button>
          <MdInsertDriveFile size={24} />
        </button>
        <button className="text-blue-600">
          <IoIosAddCircleOutline size={36} />
        </button>
        <Link to="/smartrem">
        <button>
          <FaRegCalendarAlt size={24} />
        </button>
        </Link>
        <button>
          <BsBook size={22} />
        </button>
      </div>
      </>
);
};
