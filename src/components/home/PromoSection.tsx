"use client";

import { motion } from "framer-motion";
import { Rocket, BadgePercent, ThumbsUp } from "lucide-react";

const promos = [
  {
    icon: <Rocket className="w-8 h-8 text-yellow-500" />,
    title: "Hızlı Başlangıç",
    description:
      "Kayıt ol, ilanını oluştur, kazanmaya hemen başla. Uzun onay süreçlerine veda et.",
  },
  {
    icon: <BadgePercent className="w-8 h-8 text-yellow-500" />,
    title: "Kazanç Dostu",
    description:
      "Düşük komisyon her 4 işte 1 komisyonsuz avantajıyla maksimum kazanç.",
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-yellow-500" />,
    title: "Güvenli ve Adil",
    description:
      "İş teslimi, ödeme ve iletişim süreçleri tamamen şeffaf, kullanımı kolay ve güvenli.",
  },
];

export default function PromoSection() {
  return (
    <section className="border-t border-yellow-400 w-full py-20 bg-gradient-to-b from-[#fffde7] to-white dark:from-muted dark:to-background">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-center text-primary mb-12"
        >
          FreelansUp&apos;la Neden Şimdi Başlamalısın?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.map((promo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group bg-white dark:bg-muted p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-100 p-3 rounded-full group-hover:rotate-6 transition-all">
                  {promo.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {promo.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {promo.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
