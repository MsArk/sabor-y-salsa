import type { VenueRepository } from "@/core/ports/venue-repository";
import type { Venue, MenuItem, Event } from "@/core/domain/venue";

export class StaticVenueRepository implements VenueRepository {
  async getVenueInfo(): Promise<Venue> {
    return {
      name: "Sabor y Salsa",
      tagline: "Street Food Latino · Lima, Perú",
      coordinates: [-77.0428, -12.0464],
      address: "Av. La Mar 770, Miraflores, Lima, Perú",
      phone: "+51 1 234 5678",
      email: "hola@saborysal.sa",
      socialLinks: {
        instagram: "https://instagram.com/saborysal.sa",
        facebook: "https://facebook.com/saborysal.sa",
        tiktok: "https://tiktok.com/@saborysal.sa",
      },
    };
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return [
      {
        id: "1",
        name: "Ceviche Clásico",
        description: "Corvina fresca, limón, cebolla morada, ají amarillo",
        price: 38,
        category: "Ceviches",
        tags: ["Chef's Choice"],
      },
      {
        id: "2",
        name: "Lomo Saltado",
        description: "Lomo fino, tomate, cebolla, papas fritas, arroz blanco",
        price: 42,
        category: "Saltados",
        tags: ["Trending"],
      },
      {
        id: "3",
        name: "Tacu Tacu con Mariscos",
        description: "Tacu tacu de pallares con salteado de mariscos frescos",
        price: 45,
        category: "Principales",
        tags: [],
      },
    ];
  }

  async getEvents(): Promise<Event[]> {
    const y = new Date().getFullYear();
    return [
      {
        id: "1",
        title: "Noche de Salsa",
        date: new Date(y, 3, 5),
        time: "21:00",
        description: "Una noche llena de sabor y ritmo con DJ en vivo",
      },
      {
        id: "2",
        title: "Maridaje Lima",
        date: new Date(y, 3, 12),
        time: "20:00",
        description: "Cata de pisco y gastronomía peruana de autor",
      },
    ];
  }
}
