import type { Venue, MenuItem, Event } from "@/core/domain/venue";

export interface VenueRepository {
  getVenueInfo(): Promise<Venue>;
  getMenuItems(): Promise<MenuItem[]>;
  getEvents(): Promise<Event[]>;
}
