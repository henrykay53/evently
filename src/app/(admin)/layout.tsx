"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Calendar, PlusCircle, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // default open
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: <Home size={20} /> },
    { label: "Events", href: "/events-admin", icon: <Calendar size={20} /> },
    { label: "Create Event", href: "/events-admin/create", icon: <PlusCircle size={20} /> },
    { label: "Go to User Site", href: "/", icon: <User size={20} /> },
  ];

  const renderLink = (link: typeof navLinks[0], isMobile = false) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => isMobile && setMobileOpen(false)}
        className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200 transition-colors ${
          active ? "bg-blue-600 text-white" : "text-gray-700"
        }`}
      >
        {link.icon}
        {sidebarOpen && <span>{link.label}</span>}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white shadow-md transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          {sidebarOpen && <span className="text-xl font-bold">Admin</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navLinks.map((link) => renderLink(link))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black bg-opacity-50">
          <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-md p-6 flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="mb-6 self-end"
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col gap-2 flex-1">
              {navLinks.map((link) => renderLink(link, true))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between bg-white shadow p-4">
          <span className="font-bold text-lg">Admin</span>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
