// src/components/events/MyEventCard.tsx
import React, { useState } from "react";
import { Calendar, MapPin, User, Edit, Trash2, Check, X } from "lucide-react";

import { toast } from "sonner";
import Modal from "../common/Modal";
import {
  useDeleteEventMutation,
  useUpdateEventMutation,
} from "../../redux/features/event/eventApi";
import type { EventFormData } from "../../type/event.type";
import AddEventForm from "../forms/AddEventForm";

interface MyEventCardProps {
  event: {
    _id: string;
    title: string;
    name: string;
    dateTime: string;
    location: string;
    description: string;
    attendeeCount: number;
    createdBy: string;
  };
}

const MyEventCard: React.FC<MyEventCardProps> = ({ event }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteEvent] = useDeleteEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

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

  const handleDelete = async () => {
    try {
      await deleteEvent(event._id).unwrap();
      toast.success("Event deleted successfully!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete event. Please try again.");
    }
  };

  const handleUpdate = async (data: EventFormData) => {
    const updateEventData = {
      eventId: event._id,
      ...data,
    };
    try {
      await updateEvent(updateEventData).unwrap();
      toast.success("Event updated successfully!");
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error("Failed to update event. Please try again.");
    }
  };

  return (
    <>
      {/* Event Card */}
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

          <div className="flex space-x-3">
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center"
            >
              <Edit className="w-5 h-5 mr-2" />
              Update
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Update Event Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Update Event"
        size="lg"
      >
        <AddEventForm
          onSubmit={handleUpdate}
          isLoading={isUpdating}
          defaultValues={{
            title: event.title,
            name: event.name,
            dateTime: new Date(event.dateTime).toISOString().slice(0, 16),
            location: event.location,
            description: event.description,
            attendeeCount: event.attendeeCount,
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Event"
        size="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            Delete this event?
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="btn-outline flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn-primary bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center"
            >
              <Check className="w-5 h-5 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyEventCard;
