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
    if (!isAuthenticated) {
      toast.error("Please login to join events");
      return;
    }

    try {
      await joinEvent({
        eventId: event._id,
        data: { userId },
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
    <div className="group card bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-accent-500/30 border border-white/20 dark:border-neutral-700 transition-transform duration-300 hover:-translate-y-1">
      <div className="p-6">
        {/* Header */}
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
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-semibold py-1 px-3 rounded-full shadow-inner shadow-white/10 hover:scale-105 transition-transform duration-200">
            <Users className="inline w-4 h-4 mr-1" />
            {event.attendeeCount} attending
          </div>
        </div>

        {/* Event Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
            <Calendar className="w-5 h-5 text-primary-500 mr-2" />
            {formatDateTime(event.dateTime)}
          </div>
          <div className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
            <MapPin className="w-5 h-5 text-primary-500 mr-2" />
            {event.location}
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 line-clamp-3">
          {event.description}
        </p>

        {/* Join Button */}
        <button
          onClick={handleJoin}
          disabled={event.hasJoined || isLoading}
          className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center transition-all duration-300 ${
            event.hasJoined
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600"
          } disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : event.hasJoined ? (
            <>
              <Heart className="w-5 h-5 mr-2 fill-white" />
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
