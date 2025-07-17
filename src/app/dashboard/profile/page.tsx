"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import ProfileImageUploader from "@/components/dashboard/profile/ProfileImageUploader";
import AboutEditor from "@/components/dashboard/profile/AboutEditor";
import ExpertiseTags from "@/components/dashboard/profile/ExpertiseTags";
import ServicesList from "@/components/dashboard/profile/ServicesList";
import ReviewList from "@/components/dashboard/profile/ReviewList";
import AdCardList from "@/components/dashboard/profile/AdCardList";
import SaveProfileButton from "@/components/dashboard/profile/SaveProfileButton";
import { toast } from "sonner";

import type { Profile, Expertise, Service } from "@/types/profile";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get("/api/profile/me")
        .then((res) => {
          setProfile(res.data as Profile);
        })
        .catch(() => toast.error("Profil bilgileri alınamadı."))
        .finally(() => setLoading(false));
    }
  }, [session]);

  const handleSave = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const { image, about, expertise, services } = profile;
      await axios.put("/api/profile", { image, about, expertise, services });
      toast.success("Profil başarıyla güncellendi");
    } catch {
      toast.error("Güncelleme sırasında bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Yükleniyor...</div>;
  if (!profile)
    return <div className="p-4 text-red-500">Profil bulunamadı</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <ProfileImageUploader profile={profile} setProfile={setProfile} />
      <AboutEditor
        value={profile.about}
        onChange={(value) =>
          setProfile((prev) => (prev ? { ...prev, about: value } : prev))
        }
      />
      <ExpertiseTags
        tags={profile.expertise}
        onChange={(value: Expertise[]) =>
          setProfile((prev) => (prev ? { ...prev, expertise: value } : prev))
        }
      />
      <ServicesList
        services={profile.services}
        onChange={(value: Service[]) =>
          setProfile((prev) => (prev ? { ...prev, services: value } : prev))
        }
      />
      <SaveProfileButton onClick={handleSave} loading={loading} />

      <hr className="my-6" />

      <h2 className="text-xl font-semibold">İlanlarım</h2>
      <AdCardList ads={profile.ads} />

      <h2 className="text-xl font-semibold mt-6">Gelen Değerlendirmeler</h2>
      <ReviewList reviews={profile.reviews} />
    </div>
  );
}
