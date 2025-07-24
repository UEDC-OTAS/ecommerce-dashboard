import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Truck,
  Headphones,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import logo from "../assets/uedc.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Package, label: "Inventory" },
    { path: "/orders", icon: ShoppingCart, label: "Order" },
    { path: "/delivery", icon: Truck, label: "Delivery" },
    { path: "/support", icon: Headphones, label: "Customer Support" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
        lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Mobile Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VSOP</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${
                        isActive(item.path)
                          ? "bg-orange-500 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Nwe Nwe Lin</p>
              <p className="text-xs text-gray-500">Finance</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar Overlay */}
      {isDesktopExpanded && (
        <div
          className="hidden lg:block fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setIsDesktopExpanded(false)}
        />
      )}

      {/* Desktop Sidebar - Click to Expand */}
      <div className="hidden lg:block">
        <div
          className={`
          fixed left-2.5 px-2 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out shadow-lg
          ${isDesktopExpanded ? "w-64" : "w-16"}
        `}
        >
          {/* Menu Toggle Button */}
          <div className="py-4 border-b border-gray-200 flex justify-between">
            <div
              className={`items-center justify-center ${
                isDesktopExpanded ? "flex" : "hidden"
              }`}
            >
              <img src={logo} alt="logo" className="w-10 h-10 rounded-md" />
            </div>
            <button
              onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6">
            <ul className="space-y-2 ">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center px-3 py-3 rounded-lg transition-all duration-300 relative group
                        ${
                          isActive(item.path)
                            ? "bg-orange-500 text-white shadow-lg "
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                      `}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      {isDesktopExpanded && (
                        <span className="ml-3 font-medium whitespace-nowrap">
                          {item.label}
                        </span>
                      )}

                      {/* Tooltip for collapsed state */}
                      {!isDesktopExpanded && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200">
            {/* User Info */}
            <div className="p-3 flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-gray-600" />
              </div>
              {isDesktopExpanded && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
                    Nwe Nwe Lin
                  </p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">
                    Finance
                  </p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <div className="p-3 pt-0">
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors group relative">
                <LogOut size={16} className="flex-shrink-0" />
                {isDesktopExpanded && (
                  <span className="ml-3 whitespace-nowrap">Logout</span>
                )}

                {/* Tooltip for logout when collapsed */}
                {!isDesktopExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    Logout
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
