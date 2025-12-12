"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (This is a demo.)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={5}
            placeholder="Write your message..."
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-green-900 text-white rounded hover:bg-green-800 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
