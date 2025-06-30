import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const HeroSection = () => {
  // Get authentication state from Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20 float"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full opacity-20 float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full opacity-20 float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 dark:bg-neutral-800/20 backdrop-blur-sm rounded-full mb-6 border border-white/30 dark:border-neutral-700/30">
              <Sparkles className="w-4 h-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Welcome to EventHub
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Discover</span> Amazing{" "}
              <br className="hidden sm:block" />
              Events Near You
            </h1>

            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl">
              Connect with your community through incredible events. Whether
              you're looking to attend or create, EventHub makes it simple and
              enjoyable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={isAuthenticated ? "/events" : "/register"}
                className="btn-primary inline-flex items-center justify-center group"
              >
                {isAuthenticated ? "Browse Events" : "Get Started"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="/events"
                className="btn-outline inline-flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                View All Events
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-neutral-200/50 dark:border-neutral-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">1000+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Events Created
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">5000+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Happy Users
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Cities
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Visual */}
          <div
            className="relative animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              {/* Main Card */}
              <div className="card p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Tech Conference 2025
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Tomorrow • 9:00 AM
                    </p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Join us for an incredible day of learning and networking with
                  industry leaders.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    234 attendees
                  </span>
                  <button className="btn-primary py-2 px-4 text-sm">
                    Join Event
                  </button>
                </div>
              </div>

              {/* Background Cards */}
              <div className="card p-6 absolute -top-4 -right-4 -z-10 opacity-60 transform rotate-6">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
              </div>

              <div className="card p-6 absolute -bottom-4 -left-4 -z-10 opacity-40 transform -rotate-3">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
