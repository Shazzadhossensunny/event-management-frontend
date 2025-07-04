// src/pages/Events.tsx
import { useState, useEffect } from "react";
import { Calendar, Loader } from "lucide-react";
import { useGetAllEventsQuery } from "../redux/features/event/eventApi";
import EventList from "../components/events/EventList";
import Pagination from "../components/common/Pagination";
import SearchFilter from "../components/events/SearchFilter";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data: eventsData,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetAllEventsQuery({
    searchTerm,
    filterBy,
    page,
    limit,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, filterBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-900 dark:to-neutral-800 py-12">
      <div className="container mx-auto mt-16">
        {/* Search and Filters */}
        <SearchFilter
          searchTerm={searchTerm}
          filterBy={filterBy}
          setSearchTerm={setSearchTerm}
          setFilterBy={setFilterBy}
        />

        {/* Loading overlay */}
        {isFetching && (
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-xl flex flex-col items-center">
              <Loader className="w-12 h-12 text-primary-500 animate-spin mb-4" />
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                Loading events...
              </p>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="mb-8">
          {isError ? (
            <div className="text-center py-12 glass rounded-2xl">
              <div className="bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                Error loading events
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Failed to fetch events. Please try again.
              </p>
              <button
                onClick={() => refetch()}
                className="btn-primary bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-6 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
              >
                Retry
              </button>
            </div>
          ) : (
            <EventList events={eventsData?.data || []} isLoading={isLoading} />
          )}
        </div>

        {/* Pagination */}
        {eventsData?.meta?.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={eventsData.meta.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default EventsPage;
