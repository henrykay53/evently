"use client";

import { useEventStore } from "@/store/event-store";
import { Calendar, Tag, Clock } from "lucide-react";

export default function AdminDashboardPage() {
  const events = useEventStore((state) => state.events);

  const totalEvents = events.length;

  const categoriesCount = events.reduce((acc: Record<string, number>, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  const upcomingEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  ).slice(0, 3);

  return (
    <div className="space-y-10">

      {/* DASHBOARD HEADER */}
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Events */}
        <div className="p-6 bg-white shadow rounded-lg flex items-center gap-4">
          <Calendar size={32} className="text-blue-600" />
          <div>
            <p className="text-gray-600 text-sm">Total Events</p>
            <p className="text-2xl font-semibold">{totalEvents}</p>
          </div>
        </div>

        {/* Categories Count */}
        <div className="p-6 bg-white shadow rounded-lg flex items-center gap-4">
          <Tag size={32} className="text-green-600" />
          <div>
            <p className="text-gray-600 text-sm">Categories</p>
            <p className="text-2xl font-semibold">{Object.keys(categoriesCount).length}</p>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="p-6 bg-white shadow rounded-lg flex items-center gap-4">
          <Clock size={32} className="text-purple-600" />
          <div>
            <p className="text-gray-600 text-sm">Upcoming</p>
            <p className="text-2xl font-semibold">{upcomingEvents.length}</p>
          </div>
        </div>

      </div>

      {/* UPCOMING EVENTS LIST */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>

        {upcomingEvents.length === 0 && (
          <p className="text-gray-500">No upcoming events.</p>
        )}

        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <p className="font-medium text-lg">{event.title}</p>
              <p className="text-gray-500 text-sm">
                {event.date} • {event.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
