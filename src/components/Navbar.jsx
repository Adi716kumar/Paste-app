import React from "react";
import { NavLink } from "react-router-dom";
import { Home, FileText } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow flex justify-center gap-6">
      <NavLink
        to="/"
        className="flex items-center gap-2 hover:text-teal-400 transition-colors"
        title="Home"
      >
        <Home size={20} />
      </NavLink>

      <NavLink
        to="/pastes"
        className="flex items-center gap-2 hover:text-teal-400 transition-colors"
        title="View Pastes"
      >
        <FileText size={20} />
      </NavLink>
    </nav>
  );
};

export default Navbar;
