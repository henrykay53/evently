"use client";

import { useState } from "react";
import { useEventStore } from "@/store/event-store";
import Link from "next/link";
import { Search, Filter, Trash2, Pencil, X } from "lucide-react";

export default function AdminEventsPage() {
  const events = useEventStore((state) => state.events);
  const deleteEvent = useEventStore((state) => state.deleteEvent);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // PAGINATION
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const categories = ["all", ...Array.from(new Set(events.map((e) => e.category)))];

  // FILTER LOGIC
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || event.category === category;
    return matchesSearch && matchesCategory;
  });

  // PAGINATED RESULTS
  const totalPages = Math.ceil(filteredEvents.length / pageSize);
  const paginatedEvents = filteredEvents.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Events</h1>

        <Link
          href="/events-admin/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create Event
        </Link>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4">

        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-white p-3 border rounded-lg flex-1">
          <Search size={18} className="text-gray-500" />
          <input
            placeholder="Search events..."
            className="flex-1 outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex items-center gap-2 bg-white p-3 border rounded-lg">
          <Filter size={18} className="text-gray-500" />
          <select
            className="outline-none"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Banner</th>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Location</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedEvents.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No events found.
                </td>
              </tr>
            ) : (
              paginatedEvents.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-3 font-medium">{event.title}</td>
                  <td className="p-3">{event.date}</td>
                  <td className="p-3">{event.location}</td>

                  <td className="p-3">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      {event.category}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 flex gap-2 justify-end">

                    {/* EDIT LINK */}
                    <Link
                      href={`/events-admin/${event.id}`}
                      className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-1 text-sm hover:bg-green-700"
                    >
                      <Pencil size={14} /> Edit
                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={() => setDeleteId(event.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1 text-sm hover:bg-red-700"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3 mt-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded border ${
            page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              page === i + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded border ${
            page === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 space-y-4">

            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Delete Event?</h3>
              <button onClick={() => setDeleteId(null)}>
                <X />
              </button>
            </div>

            <p className="text-gray-600">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  deleteEvent(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
