// ProfileImageUploader.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import type { Expertise, Service } from "@/types/profile";

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  category: string;
  subcategory: string;
  createdAt: Date;
}

interface Review {
  id: string;
  text: string;
  userId: string;
  authorId: string;
  createdAt: Date;
  rating: number;
}

interface Profile {
  id: string;
  image: string;
  about: string;
  expertise: Expertise[];
  services: Service[];
  ads: Ad[];
  reviews: Review[];
}

interface Props {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

export default function ProfileImageUploader({ profile, setProfile }: Props) {
  const [preview, setPreview] = useState<string | null>(profile.image || null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setProfile((prev) => (prev ? { ...prev, image: result } : prev));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block font-semibold text-gray-700">
        Profil Fotoğrafı
      </label>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src={preview || "/default-avatar.png"}
            alt="Profil"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <label
            htmlFor="fileUpload"
            className="cursor-pointer px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
          >
            Fotoğraf Yükle
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>
    </div>
  );
}
