"use client";

import Link from "next/link";
import Navbar from "@/components/navigation/NavBar";
import Footer from "@/components/Footer";
import EventCard from "@/components/cards/EventCard";
import { useEventStore } from "@/store/event-store";
import { categories } from "@/data/categories";

export default function HomePage() {
  const events = useEventStore((state) => state.events);
  const featured = events.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="pt-24 space-y-16 flex-grow">
        {/* HERO SECTION */}
        <section className="text-center py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Discover Events Around You
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Explore tech, business, music, and lifestyle events. 
            Join the best experiences happening near you.
          </p>

          <Link
            href="/events"
            className="mt-6 inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Browse Events
          </Link>
        </section>

        {/* CATEGORIES */}
        <section className="px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
              >
                {cat.name}
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED EVENTS */}
        <section className="px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Featured Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((event) => (
              <EventCard key={event.id} events={event} />
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/events"
              className="text-blue-600 hover:underline font-medium"
            >
              View All Events →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
