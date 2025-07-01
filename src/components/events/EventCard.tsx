// src/components/events/EventCard.tsx
import React from "react";
import { Calendar, MapPin, User, Users, Heart } from "lucide-react";

import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useJoinEventMutation } from "../../redux/features/event/eventApi";
import type { RootState } from "../../redux/store";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    name: string;
    dateTime: string;
    location: string;
    description: string;
    attendeeCount: number;
    hasJoined?: boolean;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [joinEvent, { isLoading }] = useJoinEventMutation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const handleJoin = async () => {
    console.log(event._id);
    if (!isAuthenticated) {
      toast.error("Please login to join events");
      return;
    }

    try {
      await joinEvent({
        eventId: event._id,
        data: { userId }, // Send user ID in the request body
      }).unwrap();
      toast.success("Successfully joined the event!");
    } catch (error) {
      toast.error("Failed to join event. Please try again.");
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-300 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-white/20 dark:border-neutral-700/50 rounded-xl shadow-card">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              {event.title}
            </h3>
            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <User className="w-4 h-4 mr-1" />
              <span>Posted by {event.name}</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium py-1 px-3 rounded-full">
            {event.attendeeCount} attending
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-primary-500 mr-2" />
            <span className="text-neutral-700 dark:text-neutral-300">
              {formatDateTime(event.dateTime)}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-primary-500 mr-2" />
            <span className="text-neutral-700 dark:text-neutral-300">
              {event.location}
            </span>
          </div>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3">
          {event.description}
        </p>

        <button
          onClick={handleJoin}
          disabled={event.hasJoined || isLoading}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
            event.hasJoined
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600"
          } transition-all duration-300`}
        >
          {isLoading ? (
            <div className="spinner border-2 border-t-white border-r-white border-b-white border-l-transparent rounded-full w-5 h-5 animate-spin"></div>
          ) : event.hasJoined ? (
            <>
              <Heart className="w-5 h-5 mr-2 fill-current" />
              Joined
            </>
          ) : (
            "Join Event"
          )}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
