"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ayşe Y.",
    role: "Yazılım Geliştirici",
    comment:
      "FreelansUp sayesinde sadece 2 haftada 3 iş aldım. Komisyonlar diğer sitelere göre çok daha adil.",
  },
  {
    name: "Mehmet T.",
    role: "Tasarımcı",
    comment:
      "İlk kez bir freelancer platformunda bu kadar destek gördüm. 4 işten 1’inin komisyonsuz olması gerçekten süper!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-20 bg-white dark:bg-background">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-center text-primary mb-12"
        >
          Kullanıcılarımız Ne Diyor?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 bg-muted dark:bg-muted/50 rounded-xl shadow-md border border-gray-200"
            >
              <Quote className="w-6 h-6 text-yellow-500 mb-3" />
              <p className="text-muted-foreground italic mb-4">
                &quot;{t.comment}&quot;
              </p>
              <div className="font-semibold text-foreground">
                {t.name} –{" "}
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
