import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Calendar, Plus, ArrowLeft, Loader } from "lucide-react";
import type { RootState } from "../redux/store";
import { useGetMyEventsQuery } from "../redux/features/event/eventApi";
import SearchFilter from "../components/events/SearchFilter";
import MyEventCard from "../components/events/MyEventCard";
import Pagination from "../components/common/Pagination";
import type { TEvent } from "../type/event.type";

const MyEventsPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
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
  } = useGetMyEventsQuery({
    userId: user?.userId,
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
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="btn-ghost inline-flex items-center mb-4 md:mb-0 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold gradient-text">My Events</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manage all events you've created
            </p>
          </div>

          <button
            onClick={() => navigate("/add-event")}
            className="btn-primary inline-flex items-center mt-4 md:mt-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Event
          </button>
        </div>

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
                Loading your events...
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
                Failed to fetch your events. Please try again.
              </p>
              <button
                onClick={() => refetch()}
                className="btn-primary bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-6 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                [...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="card p-6 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-white/20 dark:border-neutral-700/50 rounded-xl"
                  >
                    <div className="animate-pulse">
                      <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-6"></div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                      </div>
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full mb-4"></div>
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-6"></div>
                      <div className="flex space-x-3">
                        <div className="h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex-1"></div>
                        <div className="h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex-1"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : eventsData?.data.length === 0 ? (
                <div className="col-span-full text-center py-12 glass rounded-2xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-white/20 dark:border-neutral-700/50">
                  <div className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-neutral-800 dark:to-neutral-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-12 h-12 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                    No events created yet
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    You haven't created any events yet. Start by creating your
                    first event!
                  </p>
                  <button
                    onClick={() => navigate("/add-event")}
                    className="btn-primary bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-6 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
                  >
                    Create Your First Event
                  </button>
                </div>
              ) : (
                eventsData?.data.map((event: TEvent) => (
                  <MyEventCard key={event._id} event={event} />
                ))
              )}
            </div>
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

export default MyEventsPage;
