"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full shadow-sm border-b bg-white fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Evently
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 font-medium">
          <Link href="/events" className="hover:text-green-900">
            Events
          </Link>
          <Link href="/about" className="hover:text-green-900">
            About
          </Link>
          <Link href="/contact" className="hover:text-green-900">
            Contact
          </Link>
          <Link href="/admin" className="hover:text-green-900">
            Admin
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col gap-2 p-4">
            <Link
              href="/events"
              className="py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/about"
              className="py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
