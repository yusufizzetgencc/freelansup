"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface Package {
  name: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
}

interface Props {
  next: () => void;
  prev: () => void;
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
}

export default function StepPackages({
  next,
  prev,
  packages,
  setPackages,
}: Props) {
  useEffect(() => {
    if (packages.length === 0) {
      setPackages([
        {
          name: "Temel",
          title: "",
          description: "",
          price: 0,
          deliveryTime: "",
        },
        {
          name: "Orta",
          title: "",
          description: "",
          price: 0,
          deliveryTime: "",
        },
        {
          name: "Pro",
          title: "",
          description: "",
          price: 0,
          deliveryTime: "",
        },
      ]);
    }
  }, [packages.length, setPackages]);

  const addPackage = () => {
    if (packages.length >= 3) {
      toast.error("Zaten 3 paket mevcut.");
      return;
    }

    const defaultNames = ["Temel", "Orta", "Pro"];
    const nextName =
      defaultNames[packages.length] || `Paket ${packages.length + 1}`;

    setPackages([
      ...packages,
      {
        name: nextName,
        title: "",
        description: "",
        price: 0,
        deliveryTime: "",
      },
    ]);
    toast.success("Yeni paket eklendi.");
  };

  const removePackage = (index: number) => {
    const updated = [...packages];
    updated.splice(index, 1);
    setPackages(updated);
    toast.success("Paket kaldırıldı.");
  };

  const updatePackage = (
    index: number,
    field: keyof Package,
    value: string | number
  ) => {
    const updated = [...packages];
    updated[index] = {
      ...updated[index],
      [field]: field === "price" ? parseFloat(value as string) || 0 : value,
    };
    setPackages(updated);
  };

  const validatePackages = () => {
    return packages.every(
      (p) =>
        p.name.trim() !== "" &&
        // removed title check
        p.description.trim() !== "" &&
        typeof p.price === "number" &&
        !isNaN(p.price) &&
        p.deliveryTime.trim() !== ""
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#002133]">Paketler</h2>
      <div className="flex flex-wrap gap-4 justify-between">
        {packages.map((p, i) => {
          const descriptions = [
            "Başlangıç için ideal, basit hizmetler içerir.",
            "Daha kapsamlı çözümler, orta seviye işler için.",
            "En geniş hizmet paketi, profesyonel çözümler sunar.",
          ];
          const packageShortDesc =
            i === 0
              ? descriptions[0]
              : i === 1
              ? descriptions[1]
              : i === 2
              ? descriptions[2]
              : "";
          return (
            <div
              key={i}
              className="w-full md:w-[32%] min-h-[300px] space-y-3 border border-gray-200 p-5 rounded-lg shadow-sm bg-white relative transition-all duration-300 hover:shadow-lg hover:border-[#ffb900]"
            >
              <div>
                <input
                  value={p.name}
                  onChange={(e) => updatePackage(i, "name", e.target.value)}
                  placeholder="Paket İsmi"
                  className="w-full border border-gray-300 px-3 py-2 rounded font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#ffb900] transition duration-300 text-[#002133] bg-white placeholder:text-gray-500"
                />
                <div className="mt-1 text-sm text-gray-600">
                  {packageShortDesc}
                </div>
              </div>
              <textarea
                value={p.description}
                onChange={(e) =>
                  updatePackage(i, "description", e.target.value)
                }
                placeholder="Paket Açıklaması"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffb900] transition duration-300 bg-white text-[#002133] placeholder:text-gray-500"
                rows={2}
              />
              <div className="flex gap-4">
                <input
                  value={p.price.toString()}
                  onChange={(e) => updatePackage(i, "price", e.target.value)}
                  placeholder="Fiyat (TL)"
                  className="w-1/2 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffb900] transition duration-300 font-medium bg-white text-[#002133] placeholder:text-gray-500"
                  type="number"
                  min={0}
                />
                <input
                  value={p.deliveryTime}
                  onChange={(e) =>
                    updatePackage(i, "deliveryTime", e.target.value)
                  }
                  placeholder="Teslim Süresi (ör. 3 gün)"
                  className="w-1/2 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffb900] transition duration-300 bg-white text-[#002133] placeholder:text-gray-500"
                />
              </div>
              {packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(i)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-300 rounded-full p-1 hover:bg-red-50"
                  aria-label="Paketi Sil"
                >
                  <Trash2 size={22} strokeWidth={2.2} />
                </button>
              )}
            </div>
          );
        })}
      </div>
      <Button
        onClick={addPackage}
        className="bg-[#ffb900] text-[#002133] hover:bg-[#ffde59] transition duration-300 flex items-center gap-2 font-semibold px-5 py-2 rounded-lg"
        type="button"
      >
        <Plus size={20} strokeWidth={2.2} /> Paket Ekle
      </Button>
      <div className="flex justify-between pt-4">
        <Button
          variant="ghost"
          onClick={prev}
          className="bg-gray-100 hover:bg-gray-200 text-[#002133] transition-all duration-200"
        >
          Geri
        </Button>
        <Button
          onClick={() => {
            if (!validatePackages()) {
              toast.error("Lütfen tüm paket alanlarını eksiksiz doldurun.");
              return;
            }
            localStorage.setItem("ad_packages", JSON.stringify(packages));
            next();
          }}
          className="bg-[#ffb900] text-[#002133] hover:bg-[#ffde59] transition duration-300 font-semibold px-8 py-2 rounded-lg"
        >
          Devam Et
        </Button>
      </div>
    </div>
  );
}
