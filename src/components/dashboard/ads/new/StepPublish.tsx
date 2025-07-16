"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Package {
  description: string;
  price: number;
  deliveryTime: string;
}

interface Props {
  prev: () => void;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  image: string;
  packages: Package[];
}

export default function StepPublish({
  prev,
  title,
  description,
  category,
  subCategory,
  image,
  packages,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    if (
      !title ||
      !description ||
      !category ||
      !subCategory ||
      !image ||
      packages.length === 0
    ) {
      toast.error("Tüm alanları doldurduğunuzdan emin olun.");
      return;
    }

    try {
      setIsLoading(true);

      // Cloudinary yükleme adımı
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        toast.error("Cloudinary ayarları eksik!");
        setIsLoading(false);
        return;
      }

      // Since image is now a string (URL), we cannot append it as a File directly.
      // Assuming the image is a local base64 or URL, we need to fetch the file blob.
      // So we fetch the image as blob to upload to Cloudinary.

      const response = await fetch(image);
      if (!response.ok) {
        toast.error("Resim yüklenemedi.");
        setIsLoading(false);
        return;
      }
      const blob = await response.blob();
      const file = new File([blob], "upload.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadRes.ok) {
        toast.error("Cloudinary yükleme başarısız.");
        setIsLoading(false);
        return;
      }

      const uploadData = await uploadRes.json();
      const uploadedImageUrl = uploadData.secure_url;

      const response2 = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
          subcategory: subCategory,
          image: uploadedImageUrl,
          packages,
        }),
      });

      if (!response2.ok) {
        toast.error("İlan yayınlanırken hata oluştu.");
        return;
      }

      toast.success("İlan başarıyla yayınlandı!");
      localStorage.removeItem("ad_packages");

      setTimeout(() => {
        window.location.href = "/dashboard/ads";
      }, 1000);
    } catch (error) {
      console.error("İlan gönderme hatası:", error);
      toast.error("Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5 p-4">
      <h2 className="text-2xl font-bold text-[#002133]">İlanı Yayınla 🎉</h2>
      <p className="text-base text-gray-700">
        Artık ilanınız yayına hazır. Aşağıdaki butona tıklayarak yayına
        alabilirsiniz.
      </p>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prev}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-myDarkYellow text-black"
        >
          <ArrowLeft size={18} />
          Geri
        </Button>
        <Button
          onClick={handlePublish}
          disabled={isLoading}
          className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
        >
          <CheckCircle size={20} />
          {isLoading ? "Yükleniyor..." : "Yayınla"}
        </Button>
      </div>
    </div>
  );
}
