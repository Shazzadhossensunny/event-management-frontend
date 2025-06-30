export interface TEvent {
  id: string;
  eventTitle: string;
  name: string;
  dateTime: string;
  location: string;
  description: string;
  attendeeCount: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
// src/features/events/eventTypes.ts
export interface EventFormData {
  title: string;
  name: string;
  dateTime: string; // Will be converted to Date object
  location: string;
  description: string;
  attendeeCount: number;
}

export interface TEvent extends EventFormData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
