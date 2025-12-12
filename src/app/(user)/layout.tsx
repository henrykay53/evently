import "../globals.css";
import Navbar from "@/components/navigation/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Evently",
  description: "Find and book top events",
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
