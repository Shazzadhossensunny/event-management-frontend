import React from "react";
import EventCard from "./EventCard";
import type { TEvent } from "../../type/event.type";
import { Calendar } from "lucide-react";

interface EventListProps {
  events: TEvent[];
  isLoading: boolean;
}

const EventList: React.FC<EventListProps> = ({ events, isLoading }) => {
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-md border border-white/20 dark:border-neutral-700/50 shadow-lg animate-pulse"
          >
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            </div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full mb-3"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6 mb-3"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3 mb-6"></div>
            <div className="h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  // No event found
  if (events.length === 0) {
    return (
      <div className="text-center py-16 px-6 glass rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-md border border-white/20 dark:border-neutral-700/50 shadow-inner">
        <div className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-neutral-800 dark:to-neutral-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow">
          <Calendar className="w-12 h-12 text-primary-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">
          No Events Found
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          Try adjusting your search or filters to discover more events.
        </p>
      </div>
    );
  }

  // Event list
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
