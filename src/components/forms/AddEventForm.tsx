// src/forms/AddEventForm.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, MapPin, User, Text, Users } from "lucide-react";
import type { EventFormData } from "../../type/event.type";

// Form validation schema
const eventSchema = z.object({
  title: z.string().min(5, "Event title must be at least 5 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  dateTime: z.coerce.date({
    required_error: "Date and time are required",
    invalid_type_error: "Invalid date format",
  }),
  location: z.string().min(5, "Location must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  attendeeCount: z.coerce
    .number()
    .min(0, "Attendee count cannot be negative")
    .default(0),
});

interface AddEventFormProps {
  onSubmit: SubmitHandler<EventFormData>;
  isLoading: boolean;
  error?: string | null;
}

const AddEventForm: React.FC<AddEventFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      attendeeCount: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="alert-error p-4 rounded-lg mb-6">{error}</div>}

      {/* Event Title */}
      <div>
        <label htmlFor="title" className="form-label flex items-center">
          <Text className="w-5 h-5 mr-2" />
          Event Title
        </label>
        <input
          id="title"
          type="text"
          className="form-input"
          placeholder="Enter event title"
          {...register("title")}
        />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="form-label flex items-center">
          <User className="w-5 h-5 mr-2" />
          Your Name
        </label>
        <input
          id="name"
          type="text"
          className="form-input"
          placeholder="Enter your name"
          {...register("name")}
        />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="dateTime" className="form-label flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Date & Time
          </label>
          <input
            id="dateTime"
            type="datetime-local"
            className="form-input"
            {...register("dateTime")}
          />
          {errors.dateTime && (
            <p className="form-error">{errors.dateTime.message}</p>
          )}
        </div>

        {/* Attendee Count */}
        <div>
          <label
            htmlFor="attendeeCount"
            className="form-label flex items-center"
          >
            <Users className="w-5 h-5 mr-2" />
            Expected Attendees
          </label>
          <input
            id="attendeeCount"
            type="number"
            className="form-input"
            min="0"
            {...register("attendeeCount", { valueAsNumber: true })}
          />
          {errors.attendeeCount && (
            <p className="form-error">{errors.attendeeCount.message}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="form-label flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Location
        </label>
        <input
          id="location"
          type="text"
          className="form-input"
          placeholder="Enter event location"
          {...register("location")}
        />
        {errors.location && (
          <p className="form-error">{errors.location.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="form-label">
          Event Description
        </label>
        <textarea
          id="description"
          className="form-input min-h-[120px]"
          placeholder="Describe your event..."
          {...register("description")}
        />
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center"
        >
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <>
              Add Event
              <Calendar className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddEventForm;
