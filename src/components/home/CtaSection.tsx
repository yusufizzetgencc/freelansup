"use client";

import { motion } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="w-full py-24 bg-yellow-50 dark:bg-yellow-100/10">
      <div className="container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <Sparkles className="w-7 h-7 text-yellow-500" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
              FreelansUp’ta Kazanmaya Hemen Başla!
            </h2>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Ücretsiz kaydol, ilanını oluştur, sana özel müşterilerle buluş. En
            düşük komisyon oranları ve bol kazanç seni bekliyor!
          </p>

          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 shadow-lg"
          >
            <Rocket className="w-5 h-5" />
            Ücretsiz Kayıt Ol
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
