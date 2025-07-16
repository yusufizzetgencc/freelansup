"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadCloud, ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface Props {
  next: () => void;
  prev: () => void;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function StepImageUpload({
  next,
  prev,
  image,
  setImage,
  setImageFile,
}: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
    setImageFile(file);
    toast.success("Görsel önizleme hazır.");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-[#002133]">
        İlan Görseli Yükle
      </h2>

      {image ? (
        <div className="mb-4">
          <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <Image
              src={image}
              alt="Görsel Önizleme"
              width={600}
              height={400}
              className="object-cover w-full h-auto"
            />
          </div>
          <label className=" mt-3 text-center cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-[#ffb900] rounded-md text-[#ffb900] hover:bg-[#ffb900] hover:text-white transition-all select-none">
            <span className="text-sm font-medium">Farklı bir görsel seç</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="imageInput"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById("imageInput")?.click()}
              className="ml-2 text-[#ffb900] hover:text-[#ffde59] transition-all p-0"
            >
              <ImagePlus className="mr-1" size={16} /> Değiştir
            </Button>
          </label>
        </div>
      ) : (
        <div className="mb-4 text-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer text-[#002133] hover:text-[#ffb900] transition-all select-none">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center"
          >
            <UploadCloud className="mb-2" size={36} />
            <span className="text-sm font-medium">
              Görsel seçmek için tıklayın
            </span>
          </label>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prev}
          className="border-[#002133] text-[#002133] hover:bg-[#002133] hover:text-white transition-all"
        >
          Geri
        </Button>
        <Button
          onClick={next}
          disabled={!image}
          className="bg-[#ffb900] text-[#002133] hover:bg-[#ffde59] transition-all disabled:opacity-50"
        >
          <UploadCloud className="mr-2" size={18} /> Devam Et
        </Button>
      </div>
    </div>
  );
}
