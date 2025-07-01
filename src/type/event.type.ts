export interface TEvent {
  _id: string;
  title: string;
  name: string;
  dateTime: string;
  location: string;
  description: string;
  attendeeCount: number;
  hasJoined?: boolean;
  createdBy: string;
  attendees: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventFormData {
  title: string;
  name: string;
  dateTime: string;
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

export interface EventsResponse {
  data: Event[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
