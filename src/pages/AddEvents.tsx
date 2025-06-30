// src/pages/AddEventPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Calendar, ArrowLeft } from "lucide-react";
import type { RootState } from "../redux/store";
import { useCreateEventMutation } from "../redux/features/event/eventApi";
import type { EventFormData } from "../type/event.type";
import AddEventForm from "../components/forms/AddEventForm";

const AddEventPage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const [createEvent, { isLoading, isSuccess, error }] =
    useCreateEventMutation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (formData: EventFormData) => {
    try {
      // Create the event payload
      const eventData = {
        ...formData,
        userId: user?.userId || "",
      };

      await createEvent(eventData).unwrap();
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  };

  // Redirect on success
  useEffect(() => {
    if (isSuccess) {
      navigate("/events");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-900 dark:to-neutral-800 py-12">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="btn-ghost mb-6 inline-flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </button>

          <div className="glass rounded-3xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Create New Event
              </h1>
              <p className="text-white/90 mt-2">
                Fill out the form below to add your event to our platform
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              <AddEventForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={
                  error ? "Failed to create event. Please try again." : null
                }
              />
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              Event Creation Tips
            </h3>
            <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <span>
                  Be specific with your event title to attract the right
                  audience
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <span>
                  Provide detailed location information including venue name and
                  address
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <span>
                  Include all relevant details in the description to help
                  attendees prepare
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventPage;
