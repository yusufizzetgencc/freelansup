// src/types/profile.ts
export interface Expertise {
  id: string;
  name: string;
  userId: string;
}

export interface Service {
  id: string;
  name: string;
  userId: string;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  category: string;
  subcategory: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  text: string;
  userId: string;
  authorId: string;
  createdAt: Date;
  rating: number;
}

export interface Profile {
  id: string;
  image: string;
  about: string;
  expertise: Expertise[];
  services: Service[];
  ads: Ad[];
  reviews: Review[];
}
