import Image from "next/image";
import { EventType } from "@/types/events";

export default function EventCard({ events }: { events: EventType }) {
  return (
    <a
      href={`/events/${events.id}`}
      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <Image
        src={events.banner}
        alt={events.title}
        width={50}
        height={50}
        className="h-40 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{events.title}</h3>
        <p className="text-sm text-gray-600">
          {events.date} • {events.location}
        </p>

        <span className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
          {events.category}
        </span>
      </div>
    </a>
  );
}
