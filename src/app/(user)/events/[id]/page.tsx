"use client";
import Image from "next/image";

import { useParams } from "next/navigation";
import { useEventStore } from "@/store/event-store";

export default function EventDetailsPage() {
  const { id } = useParams();
  const events = useEventStore((state) => state.events);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="p-4">
        <p className="text-red-500">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto space-y-10">
      {/* BANNER */}
      <Image
        src={event.banner}
        alt={event.title}
        width={50}
        height={50}
        className="w-full h-64 object-cover rounded-xl"
      />

      <div className="space-y-4">
        {/* TITLE */}
        <h1 className="text-3xl font-bold">{event.title}</h1>

        {/* DETAILS */}
        <p className="text-gray-600">
          📅 {event.date} — {event.time}
        </p>

        <p className="text-gray-600">📍 {event.location}</p>

        <span className="inline-block text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md">
          {event.category}
        </span>
      </div>

      {/* DESCRIPTION */}
      <section>
        <h2 className="text-xl font-semibold mb-2">About this event</h2>
        <p className="text-gray-700 leading-relaxed">{event.description}</p>
      </section>

      {/* REGISTER BUTTON (Mock) */}
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
        Register for Event
      </button>
    </div>
  );
}
