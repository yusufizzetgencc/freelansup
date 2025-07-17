"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Star } from "lucide-react";

interface UserPublicProfile {
  image: string | null;
  firstName: string;
  lastName: string;
  username: string;
  about?: string;
  services: string[];
  expertise: string[];
  averageRating: number | null;
  reviews: {
    text: string;
    rating: number;
    authorName: string;
  }[];
}

export default function PublicUserProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<UserPublicProfile | null>(null);

  useEffect(() => {
    if (!username) return;
    axios.get(`/api/users/public/${username}`).then((res) => {
      setProfile(res.data);
    });
  }, [username]);

  if (!profile) return <div className="p-6">Yükleniyor...</div>;

  return (
    <div className="mt-15 max-w-3xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md">
      {/* Profil Başlığı */}
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
          <Image
            src={profile.image || "/default-avatar.png"}
            alt="Profil Fotoğrafı"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-yellow-500 font-semibold flex items-center gap-2 mt-1">
            @{profile.username}
            <span className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={
                    i < (profile.averageRating ?? 0) ? "currentColor" : "none"
                  }
                  stroke="currentColor"
                />
              ))}
            </span>
          </p>
          <p className="mt-1 text-gray-600 text-sm">
            {profile.averageRating?.toFixed(1) ?? "0.0"} / 5 puan
          </p>
        </div>
      </div>

      {/* Hakkında */}
      {profile.about && (
        <section className="bg-yellow-50 p-5 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-2 border-b border-yellow-400 pb-1 text-black">
            Hakkında
          </h2>
          <p className="text-gray-700 whitespace-pre-line">{profile.about}</p>
        </section>
      )}

      {/* Hizmetler */}
      {profile.services?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b border-yellow-400 pb-1 text-black">
            Hizmetler
          </h2>
          <div className="flex flex-wrap gap-3">
            {profile.services.map((service, i) => (
              <span
                key={i}
                className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Uzmanlık Alanları */}
      {profile.expertise?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b border-yellow-400 pb-1 text-black">
            Uzmanlık Alanları
          </h2>
          <div className="flex flex-wrap gap-3">
            {profile.expertise.map((expertise, i) => (
              <span
                key={i}
                className="bg-yellow-200 text-yellow-900 text-sm font-semibold px-4 py-2 rounded-full shadow"
              >
                {expertise}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Yorumlar */}
      {profile.reviews?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-5 border-b border-yellow-400 pb-1 text-black">
            Yorumlar ({profile.reviews.length})
          </h2>
          <div className="space-y-5">
            {profile.reviews.map((review, i) => (
              <div
                key={i}
                className="p-4 bg-yellow-50 rounded-lg shadow-md border border-yellow-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-yellow-800">
                    {review.authorName}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        fill={j < review.rating ? "currentColor" : "none"}
                        stroke="currentColor"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
