import { useState } from "react";
import uedc from "../assets/uedc.png";

import { Menu, X, User } from "lucide-react";
import {
  MdShelves,
  MdOutlineShoppingCart,
  MdOutlineDoorBack,
} from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-16">
            {/* Logo */}
            <div className="">
              <img src={uedc} alt="uedc logo" className="w-12 rounded-lg" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                    : "text-gray-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                }
              >
                <MdShelves className="w-4 h-4 inline mr-2" /> Inventory
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                    : "text-gray-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                }
              >
                <MdOutlineShoppingCart className="w-4 h-4 inline mr-2" /> Order
              </NavLink>
              <NavLink
                to="/delivery"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                    : "text-gray-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                }
              >
                <CiDeliveryTruck className="w-4 h-4 inline mr-2" /> Delivery
              </NavLink>
            </div>
          </div>

          {/* Right side - User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">New New Lin</div>
                <div className="text-gray-500">Finance</div>
              </div>
            </div>

            {/* Logout Button */}
            <button className="bg-orange-100 text-black px-6 py-3 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors flex items-center space-x-2">
              <MdOutlineDoorBack className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              {/* Mobile Navigation Links */}
              <NavLink className="bg-orange-500 text-white block px-3 py-2 rounded text-sm font-medium w-full text-left">
                📦 Inventory
              </NavLink>
              <NavLink className="text-gray-600 block px-3 py-2 rounded text-sm font-medium w-full text-left hover:bg-gray-100">
                📋 Order
              </NavLink>
              <NavLink className="text-gray-600 block px-3 py-2 rounded text-sm font-medium w-full text-left hover:bg-gray-100">
                🚚 Delivery
              </NavLink>

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">New New Lin</div>
                    <div className="text-gray-500">Finance</div>
                  </div>
                </div>
                <button className="bg-orange-100 text-black block px-3 py-2 rounded text-sm font-medium w-full text-left mt-2 hover:bg-orange-200 transition-colors">
                  <MdOutlineDoorBack className="w-4 h-4 inline mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
