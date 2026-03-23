export interface Venue {
  name: string;
  tagline: string;
  coordinates: [number, number];
  address: string;
  phone: string;
  email: string;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  imageUrl?: string;
  ticketUrl?: string;
}
