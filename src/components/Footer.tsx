import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-green-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">Evently</h2>
            <p className="text-sm opacity-80">
              Discover events. Connect with people.  
              Make memories.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/events" className="hover:text-white">Events</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>Tech</li>
              <li>Music</li>
              <li>Business</li>
              <li>Lifestyle</li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-white mb-3">Connect</h3>
            <div className="flex gap-4">
              <Link href="#"><Facebook className="hover:text-white" size={20} /></Link>
              <Link href="#"><Twitter className="hover:text-white" size={20} /></Link>
              <Link href="#"><Instagram className="hover:text-white" size={20} /></Link>
              <Link href="#"><Mail className="hover:text-white" size={20} /></Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm opacity-70">
          © {new Date().getFullYear()} Evently. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
