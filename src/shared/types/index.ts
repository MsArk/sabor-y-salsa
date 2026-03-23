export interface NavLink {
  label: string;
  href: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  imageUrl?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  coordinates: [number, number];
}
