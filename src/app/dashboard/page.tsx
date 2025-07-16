"use client";

import { useState, useEffect } from "react";
import { PublishedAds } from "@/components/dashboard/home/PublishedAds";
import Greeting from "@/components/dashboard/home/Greeting";
import MyAds from "@/components/dashboard/home/MyAds";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  username: string;
  image?: string;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  subcategory: string;
  createdAt: string;
  userId: string;
  user: User;
}

const DashboardHome = () => {
  const { data: session } = useSession();
  const [allAds, setAllAds] = useState<Ad[]>([]);
  const [myAds, setMyAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const [allRes, myRes] = await Promise.all([
          fetch("/api/ads"),
          fetch("/api/my-ads"),
        ]);
        if (!allRes.ok || !myRes.ok) {
          const allText = await allRes.text();
          const myText = await myRes.text();
          console.error(
            "API hatası:",
            allRes.status,
            allText,
            myRes.status,
            myText
          );
          setLoading(false);
          return;
        }
        const [allData, myData] = await Promise.all([
          allRes.json(),
          myRes.json(),
        ]);
        setAllAds(allData);
        setMyAds(myData);
      } catch (error) {
        console.error("İlanlar alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [session]);

  const otherAds = allAds.filter((ad) => ad.userId !== session?.user.id);

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] p-6 md:p-10">
      <section className="mb-8">
        <Greeting />
      </section>

      <section className="mb-12">
        <PublishedAds ads={otherAds} loading={loading} />
      </section>

      <section>
        <MyAds ads={myAds} loading={loading} />
      </section>
    </main>
  );
};

export default DashboardHome;
