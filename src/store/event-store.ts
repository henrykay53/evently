import { create } from "zustand";
import { EventType } from "@/types/events";
import { events as initialEvents } from "@/data/events";

type EventStore = {
  events: EventType[];
  createEvent: (data: Omit<EventType, "id">) => void;
  updateEvent: (id: string, data: Partial<EventType>) => void;
  deleteEvent: (id: string) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  events: initialEvents,

  createEvent: (data) =>
    set((state) => ({
      events: [
        ...state.events,
        { id: crypto.randomUUID(), ...data }
      ],
    })),

  updateEvent: (id, data) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
}));
