"use client";

import { useState } from "react";
import { useEventStore } from "@/store/event-store";
import EventCard from "@/components/cards/EventCard";
import { categories } from "@/data/categories";
import Navbar from "@/components/navigation/NavBar";

export default function EventsPage() {
  const events = useEventStore((state) => state.events);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" ? true : event.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-10 px-4">
      <Navbar/>
      <h1 className="text-3xl font-bold mt-6">All Events</h1>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full sm:w-72"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* EVENT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} events={event} />
          ))
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
}
