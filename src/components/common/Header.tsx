import { useState, useRef, useEffect } from "react";
import { Calendar, Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";
import { toggleDarkMode } from "../../redux/features/theme/themeSlice";
import { useGetAllUserProfileQuery } from "../../redux/features/user/userApi";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  // Fetch user profile data
  const { data: userProfile } = useGetAllUserProfileQuery([], {
    skip: !isAuthenticated,
  });

  const currentUser =
    userProfile?.data?.users?.find((u: any) => u._id === user?.userId) || user;

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
    { name: "Events", href: "/events" },
    { name: "Add Event", href: "/addEvent" },
    { name: "My Events", href: "/myEvents" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="fixed w-full top-0 z-50 navbar-glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EventHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 relative group"
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
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {currentUser?.photoUrl ? (
                    <img
                      src={currentUser.photoUrl}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-500"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>

                {/* Profile Dropdown - Only name and logout */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-1 z-50 border border-neutral-200 dark:border-neutral-700">
                    <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                        {currentUser?.name}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Only show Sign In button when not logged in
              <a
                href="/login"
                className="btn-ghost text-sm hidden md:block px-4 py-2"
              >
                Sign In
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
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
          <div className="md:hidden absolute top-16 left-0 right-0 glass border-t border-white/20 dark:border-neutral-700/50">
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              {/* Conditional Mobile Auth Section */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-3 mt-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <a
                    href="/login"
                    className="block px-4 py-3 text-center btn-ghost rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
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
