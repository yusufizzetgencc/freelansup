"use client";

import { CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Düşük Komisyon Oranı",
    description:
      "FreelansUp, piyasadaki en düşük komisyon oranlarıyla çalışır. Kazandığınızın büyük kısmı cebinizde kalır.",
  },
  {
    title: "4 İşten 1 Bizden!",
    description:
      "FreelansUp'ta sadakat ödüllendirilir. Her 4. tamamlanan işte bir komisyon bizden hediye – kazancının tamamı senin cebinde kalır!",
  },
  {
    title: "Sıfır Listeleme Ücreti",
    description:
      "İlan oluşturmak tamamen ücretsiz! Hizmetlerinizi sergileyin, ödeme almadan önce hiçbir ücret ödemezsiniz.",
  },
];

export default function Features() {
  return (
    <section className="border-t border-yellow-300 w-full py-20 bg-gradient-to-b from-[#fffde7] to-white dark:from-muted dark:to-background">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <h2 className="text-4xl font-extrabold text-center text-primary">
            FreelansUp Neden Tercih Ediliyor?
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="border border-gray-100 shadow-lg rounded-xl p-1 hover:shadow-xl transition-all duration-300 h-[280px]">
                <CardContent className="p-6 space-y-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
