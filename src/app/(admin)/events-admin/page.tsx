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

  const categories = ["all", ...Array.from(new Set(events.map((e) => e.category)))];

  // FILTER LOGIC
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || event.category === category;
    return matchesSearch && matchesCategory;
  });

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
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex items-center gap-2 bg-white p-3 border rounded-lg">
          <Filter size={18} className="text-gray-500" />
          <select
            className="outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* EVENT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow p-4 border hover:shadow-lg transition"
          >
            <img
              src={event.banner}
              alt={event.title}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="text-lg font-semibold mt-3">{event.title}</h2>

            <p className="text-gray-500 text-sm">
              {event.date} • {event.location}
            </p>

            <span className="text-xs bg-gray-200 px-2 py-1 rounded inline-block mt-2">
              {event.category}
            </span>

            {/* ACTION BUTTONS */}
            <div className="mt-4 flex gap-2">
              <Link
                href={`/events-admin/${event.id}`}

                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                <Pencil size={14} /> Edit
              </Link>

              <button
                onClick={() => setDeleteId(event.id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
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
