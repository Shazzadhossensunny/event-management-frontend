import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white/70 to-neutral-100/70 dark:from-neutral-900/90 dark:to-neutral-800/90 backdrop-blur-sm px-4 py-16">
      <div className="max-w-md w-full text-center glass rounded-2xl p-8 shadow-lg border border-white/20 dark:border-neutral-700/50">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-full">
            <CircleAlert className="h-16 w-16 text-white" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-4">
          404 - Page Not Found
        </h1>

        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
          Oops! The page you're looking for seems to have taken an unexpected
          detour.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="btn-primary bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-md shadow-primary-500/20 flex items-center justify-center"
          >
            Return to Home
          </Link>

          <Link
            to="/events"
            className="btn-outline border border-primary-500 text-primary-500 dark:text-primary-400 px-6 py-3 rounded-lg hover:bg-primary-500/10 transition-all duration-300 flex items-center justify-center"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  );
}
