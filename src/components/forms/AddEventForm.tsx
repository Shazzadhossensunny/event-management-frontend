// src/components/forms/AddEventForm.tsx
import { Calendar, MapPin, Text, Users } from "lucide-react";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import Loader from "../common/Loader";

export type EventFormData = {
  title: string;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  attendeeCount: number;
};

type EventFormProps = {
  onSubmit: (data: EventFormData) => void;
  isLoading?: boolean;
  error?: string | null;
};

const AddEventForm = ({ onSubmit, isLoading, error }: EventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    defaultValues: {
      attendeeCount: 0,
    },
  });

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("before submit data", data);
    const localDate = new Date(data.dateTime);
    const isoDate = localDate.toISOString();
    onSubmit({
      ...data,
      dateTime: isoDate,
      attendeeCount: Number(data.attendeeCount),
    } as EventFormData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Text className="w-5 h-5 text-neutral-400" />
          </div>
          <input
            id="title"
            className="form-input pl-10"
            placeholder="Event Title"
            {...register("title", { required: "Title is required" })}
          />
        </div>
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message as string}
          </p>
        )}
      </div>
      {/* Name */}
      <div>
        <label htmlFor="name" className="form-label">
          Your Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Text className="w-5 h-5 text-neutral-400" />
          </div>
          <input
            id="name"
            className="form-input pl-10"
            placeholder="Event Title"
            {...register("name", { required: "Name is required" })}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message as string}
          </p>
        )}
      </div>

      {/* Date & Time */}
      <div>
        <label htmlFor="dateTime" className="form-label">
          Date & Time
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="w-5 h-5 text-neutral-400" />
          </div>
          <input
            id="dateTime"
            type="datetime-local"
            className="form-input pl-10"
            {...register("dateTime", {
              required: "Date & Time is required",
              validate: {
                isFuture: (value) => {
                  const inputDate = new Date(value);
                  return (
                    inputDate > new Date() ||
                    "Event date and time must be in the future"
                  );
                },
              },
            })}
          />
        </div>
        {errors.dateTime && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dateTime.message as string}
          </p>
        )}
      </div>
      {/* Attendance Count */}
      <div>
        <label htmlFor="attendeeCount" className="form-label">
          Expected Attendance
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users className="w-5 h-5 text-neutral-400" />
          </div>
          <input
            id="attendeeCount"
            type="number"
            className="form-input pl-10"
            placeholder="Number of attendees"
            {...register("attendeeCount", {
              required: "Attendance count is required",
              min: { value: 0, message: "Must be 0 or more" },
            })}
          />
        </div>
        {errors.attendeeCount && (
          <p className="text-red-500 text-sm mt-1">
            {errors.attendeeCount.message as string}
          </p>
        )}
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="w-5 h-5 text-neutral-400" />
          </div>
          <input
            id="location"
            className="form-input pl-10"
            placeholder="Venue / City"
            {...register("location", { required: "Location is required" })}
          />
        </div>
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">
            {errors.location.message as string}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          className="form-input"
          rows={4}
          placeholder="Event Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message as string}
          </p>
        )}
      </div>

      {/* Error + Submit */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full"
        >
          {isLoading ? <Loader /> : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default AddEventForm;
