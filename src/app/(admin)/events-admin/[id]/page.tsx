"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEventStore } from "@/store/event-store";
import { EventType } from "@/types/events";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams(); // Get ID from URL
  const eventId = params.id as string;

  const events = useEventStore((state) => state.events);
  const updateEvent = useEventStore((state) => state.updateEvent);

  const [eventData, setEventData] = useState<Omit<EventType, "id">>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
    banner: "",
  });

  const [loading, setLoading] = useState(true);

  // Load event data on mount
  useEffect(() => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      const { id, ...rest } = event;
      setEventData(rest);
      setLoading(false);
    } else {
      // Event not found, redirect back
      router.push("/admin/events-admin");
    }
  }, [eventId, events, router]);

  const handleChange = (field: keyof typeof eventData, value: string) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventData.title || !eventData.date || !eventData.location || !eventData.description) {
      alert("Please fill all required fields");
      return;
    }

    updateEvent(eventId, eventData);
    alert("Event updated successfully!");
    router.push("g/events-admin");
  };

  if (loading) return <p>Loading event...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={eventData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Event title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            value={eventData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="City, Venue"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            value={eventData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="tech, art, fashion..."
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={eventData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Write event description..."
            rows={4}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Banner URL (optional)</label>
          <input
            type="text"
            value={eventData.banner}
            onChange={(e) => handleChange("banner", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="https://example.com/banner.jpg"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
