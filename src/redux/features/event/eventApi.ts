import { baseApi } from "../../api/baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all events (Public)
    getAllEvents: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams();

        // Add all possible query parameters matching backend
        if (params.searchTerm)
          queryString.append("searchTerm", params.searchTerm);
        if (params.search) queryString.append("search", params.search); // Backend handles both search and searchTerm
        if (params.category) queryString.append("category", params.category);
        if (params.status) queryString.append("status", params.status);
        if (params.startDate) queryString.append("startDate", params.startDate);
        if (params.endDate) queryString.append("endDate", params.endDate);
        if (params.filterBy) queryString.append("filterBy", params.filterBy); // today, current-week, last-week, current-month, last-month
        if (params.minPoints)
          queryString.append("minPoints", params.minPoints.toString());
        if (params.maxPoints)
          queryString.append("maxPoints", params.maxPoints.toString());
        if (params.userId) queryString.append("userId", params.userId);
        if (params.sort) queryString.append("sort", params.sort);
        if (params.page) queryString.append("page", params.page.toString());
        if (params.limit) queryString.append("limit", params.limit.toString());
        if (params.fields) queryString.append("fields", params.fields);

        return {
          url: `/events${
            queryString.toString() ? `?${queryString.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["Events"],
    }),

    // Get single event by ID (Public)
    getSingleEvent: builder.query({
      query: (eventId) => ({
        url: `/events/${eventId}`,
        method: "GET",
      }),
      providesTags: (result, error, eventId) => [
        { type: "Events", id: eventId },
      ],
    }),

    // Create new event (Protected)
    createEvent: builder.mutation({
      query: (data) => ({
        url: `/events/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),

    // Update event (Protected)
    updateEvent: builder.mutation({
      query: ({ eventId, ...data }) => ({
        url: `/events/${eventId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { eventId }) => [
        "Events",
        { type: "Events", id: eventId },
      ],
    }),

    // Delete event (Protected)
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `/events/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),

    // Join event (Protected)
    joinEvent: builder.mutation({
      query: ({ eventId, data = {} }) => ({
        url: `/events/${eventId}/join`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),

    // Get my events (Protected)
    getMyEvents: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams();

        // Add query parameters for filtering my events
        if (params.searchTerm)
          queryString.append("searchTerm", params.searchTerm);
        if (params.search) queryString.append("search", params.search); // Backend handles both
        if (params.category) queryString.append("category", params.category);
        if (params.status) queryString.append("status", params.status);
        if (params.startDate) queryString.append("startDate", params.startDate);
        if (params.endDate) queryString.append("endDate", params.endDate);
        if (params.filterBy) queryString.append("filterBy", params.filterBy);
        if (params.sort) queryString.append("sort", params.sort);
        if (params.page) queryString.append("page", params.page.toString());
        if (params.limit) queryString.append("limit", params.limit.toString());
        if (params.fields) queryString.append("fields", params.fields);

        return {
          url: `/events/my/events${
            queryString.toString() ? `?${queryString.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["Events"],
    }),

    // Get joined events (Protected)
    getJoinedEvents: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams();

        // Add query parameters for filtering joined events
        if (params.searchTerm)
          queryString.append("searchTerm", params.searchTerm);
        if (params.search) queryString.append("search", params.search); // Backend handles both
        if (params.category) queryString.append("category", params.category);
        if (params.status) queryString.append("status", params.status);
        if (params.startDate) queryString.append("startDate", params.startDate);
        if (params.endDate) queryString.append("endDate", params.endDate);
        if (params.filterBy) queryString.append("filterBy", params.filterBy);
        if (params.sort) queryString.append("sort", params.sort);
        if (params.page) queryString.append("page", params.page.toString());
        if (params.limit) queryString.append("limit", params.limit.toString());
        if (params.fields) queryString.append("fields", params.fields);

        return {
          url: `/events/joined/events${
            queryString.toString() ? `?${queryString.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["Events"],
    }),
  }),
});

export const {
  // Queries
  useGetAllEventsQuery,
  useGetSingleEventQuery,
  useGetMyEventsQuery,
  useGetJoinedEventsQuery,

  // Mutations
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useJoinEventMutation,
} = eventApi;
