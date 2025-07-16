"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  next: () => void;
  prev: () => void;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  image: string;
  packages: {
    name: string;
    description: string;
    price: number;
    deliveryTime: string;
  }[];
}

export default function StepPreview({
  next,
  prev,
  title,
  description,
  category,
  subCategory,
  image,
  packages,
}: Props) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-[#002133] mb-8 text-center tracking-wide">
        🎯 İlan Önizleme
      </h2>
      <div className="border p-6 rounded-lg bg-white shadow-lg text-base text-gray-800 space-y-4">
        <div>
          <strong>Başlık:</strong> {title}
        </div>
        <div>
          <strong>Açıklama:</strong> {description}
        </div>
        <div>
          <strong>Kategori:</strong>{" "}
          {category.charAt(0).toUpperCase() + category.slice(1)} /{" "}
          {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
        </div>
        <div className="w-full max-w-md mx-auto">
          {!!image ? (
            <Image
              src={image || "/placeholder.jpg"}
              alt="İlan Görseli"
              width={600}
              height={400}
              className="rounded-lg shadow-md object-cover"
            />
          ) : (
            <div className="w-full h-60 flex items-center justify-center text-gray-400 border border-dashed rounded bg-gray-100 text-sm italic">
              Görsel yüklenmedi
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#002133] mt-4">
            📦 Paketler
          </h3>
          {packages.length > 0 &&
          packages.every(
            (p) =>
              p.description.trim() !== "" &&
              typeof p.price === "number" &&
              !isNaN(p.price) &&
              p.deliveryTime.trim() !== ""
          ) ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="rounded-xl border bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="text-base font-bold text-[#002133] mb-2">
                    {pkg.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                    📝 <span>{pkg.description}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                    💰 <span className="font-medium">{pkg.price} TL</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    ⏱️ <span>{pkg.deliveryTime}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-500">
              Paket bilgileri eksik veya tanımlı değil.
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prev}
          className="hover:scale-105 transition-transform duration-200 text-black"
        >
          Geri
        </Button>
        <Button
          onClick={next}
          className="bg-[#ffb900] text-[#002133] hover:bg-[#ffde59] hover:scale-105 transition-transform duration-200"
        >
          Devam Et
        </Button>
      </div>
    </div>
  );
}
