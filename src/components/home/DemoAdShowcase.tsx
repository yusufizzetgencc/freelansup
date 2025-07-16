"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock, User } from "lucide-react";
import Image from "next/image";

const demoAds = [
  {
    title: "Modern Web Sitesi Tasarımı",
    description:
      "Sıfırdan modern, mobil uyumlu ve hızlı web siteleri tasarlıyorum.",
    username: "bugra_yazilim",
    price: "₺3000",
    time: "5 gün",
    image: "/demo/demo1.png",
  },
  {
    title: "Profesyonel Logo Tasarımı",
    description:
      "Markanızı yansıtan özgün ve profesyonel logolar tasarlıyorum.",
    username: "tasarımcı_elif",
    price: "₺1000",
    time: "2 gün",
    image: "/demo/demo2.png",
  },
  {
    title: "SEO Uyumlu İçerik Yazımı",
    description:
      "Web siteniz için Google sıralamanızı yükseltecek içerikler yazıyorum.",
    username: "yusufizzet",
    price: "₺500",
    time: "3 gün",
    image: "/demo/demo3.png",
  },
];

export default function DemoAdShowcase() {
  return (
    <section className="border-yellow-300 w-full py-20 bg-muted/40 border-t">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <h2 className="text-3xl font-extrabold text-center text-primary mb-10">
            Popüler FreelansUp İlanları
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {demoAds.map((ad, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white dark:bg-[#111827] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={ad.image}
                  alt={ad.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {ad.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {ad.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-primary mt-2">
                  <User className="w-4 h-4" />
                  <span>@{ad.username}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-4">
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <BadgeCheck className="w-4 h-4" /> {ad.price}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" /> {ad.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
