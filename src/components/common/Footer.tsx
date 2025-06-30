import { Calendar, Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-white">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">EventHub</span>
            </div>
            <p className="text-neutral-400 mb-6 max-w-md">
              Your premier destination for discovering, creating, and managing
              events. Connect with like-minded people and make every event
              memorable.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/add-event"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Create Event
                </a>
              </li>
              <li>
                <a
                  href="/my-events"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  My Events
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2025 EventHub. All rights reserved.
          </p>
          <p className="text-neutral-400 text-sm flex items-center mt-2 sm:mt-0">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for event
            lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
