import Navbar from "@/components/navigation/NavBar";
import Link from "next/link";


export const metadata = {
  title: "About Us",
  description: "Learn more about Evently",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4 space-y-12">
        <Navbar/>
      <h1 className="text-4xl font-bold text-center">About Evently</h1>

      <p className="text-lg text-gray-700 leading-relaxed">
        Evently is your ultimate platform to discover, explore, and attend events around you. 
        From tech conferences to art exhibitions, music festivals, and lifestyle meetups, 
        Evently connects you with experiences that matter.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Our mission is to make event discovery simple, interactive, and personalized. 
        Whether you’re an attendee looking for inspiration or an organizer managing your events, 
        Evently has you covered.
      </p>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-green-900 text-white rounded hover:bg-green-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
