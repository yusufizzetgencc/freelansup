"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../dashboard/Sidebar";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer lg:hidden fixed top-20 left-1 z-50 p-2 rounded-full bg-[#0c2635] shadow-lg text-white"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <div
              className={`fixed left-0 top-0 bottom-0 z-50 w-64 transform bg-[#002133] transition-transform duration-300 ${
                open ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Sidebar isOpen={open} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
