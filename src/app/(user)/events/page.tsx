"use client";

import { useState } from "react";
import { useEventStore } from "@/store/event-store";
import EventCard from "@/components/cards/EventCard";
import { categories } from "@/data/categories";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react"; 

export default function EventsPage() {
  const router = useRouter();
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

  // GROUP EVENTS BY CATEGORY
  const groupedEvents = filteredEvents.reduce((acc: any, event) => {
    if (!acc[event.category]) acc[event.category] = [];
    acc[event.category].push(event);
    return acc;
  }, {});

  // SORT CATEGORY NAMES ALPHABETICALLY
  const sortedCategoryNames = Object.keys(groupedEvents).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className="space-y-10 px-50">
      

      {/* HEADER + HOME BUTTON */}
      <div className="flex items-center gap-5 mt-20">
       <button
  onClick={() => router.push("/")}
  className="group p-2 border rounded-lg bg-green-900 hover:bg-green-800 transition flex items-center"
>
  <Home
    size={20}
    className="text-white transition"
  />
</button>

        <h1 className="text-3xl font-bold text-center">All Events</h1>
      </div>

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

      {/* GROUPED EVENT GRID */}
      <div className="pb-20 space-y-12">
        {sortedCategoryNames.length > 0 ? (
          sortedCategoryNames.map((catName) => (
            <div key={catName}>
              {/* CATEGORY TITLE */}
              <h1 className="text-2xl font-semibold mb-4 capitalize">
                {catName}
              </h1>

              {/* EVENT GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedEvents[catName].map((event: any) => (
                  <EventCard key={event.id} events={event} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
}
