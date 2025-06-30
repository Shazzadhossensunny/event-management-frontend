import React, { useState, useRef, useEffect } from "react";
import { Calendar, Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";
import { toggleDarkMode } from "../../redux/features/theme/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events", protected: true },
    { name: "Add Event", href: "/addEvent", protected: true },
    { name: "My Events", href: "/myEvents", protected: true },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  const filteredNavLinks = navLinks.filter(
    (link) => !link.protected || isAuthenticated
  );

  return (
    <header
      className={`fixed w-full top-0 z-50 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } shadow-md`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              EventHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {filteredNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`${
                  darkMode
                    ? "text-neutral-300 hover:text-primary-400"
                    : "text-neutral-700 hover:text-primary-600"
                } font-medium transition-colors duration-200 relative group`}
              >
                {link.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Right Side - Auth & Theme */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                >
                  {user?.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-500"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {user?.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {user?.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href="/login"
                  className={`${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  } text-sm px-4 py-2 rounded`}
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm py-2 px-4 rounded-lg"
                >
                  Sign Up
                </a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden ${
              darkMode ? "bg-gray-800" : "bg-white"
            } border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <nav className="px-4 py-4 space-y-2">
              {filteredNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  } rounded-lg transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              {/* Conditional Mobile Auth Section */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center space-x-2 px-4 py-3 mt-2 text-sm ${
                    darkMode
                      ? "text-red-400 hover:bg-red-900/20"
                      : "text-red-600 hover:bg-red-50"
                  } rounded-lg transition-colors duration-200`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <div
                  className={`pt-4 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } space-y-2`}
                >
                  <a
                    href="/login"
                    className={`block px-4 py-3 text-center ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    } rounded-lg transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="block px-4 py-3 text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
