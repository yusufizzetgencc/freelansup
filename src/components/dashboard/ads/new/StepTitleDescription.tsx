// /src/app/dashboard/ads/new/components/StepTitleDescription.tsx
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  next: () => void;
  prev: () => void;
  title: string;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function StepTitleDescription({
  next,
  prev,
  title,
  description,
  setTitle,
  setDescription,
}: Props) {
  const handleNext = () => {
    if (!title || !description) {
      toast.error("Lütfen başlık ve açıklamayı doldurun.");
      return;
    }
    toast.success("Başlık ve açıklama eklendi!");
    next();
  };

  return (
    <div className="space-y-6 text-[#002133]">
      <input
        type="text"
        placeholder="İlan Başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ffb900] focus:border-[#ffb900] placeholder:text-gray-400 text-base font-medium"
      />
      <textarea
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={6}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ffb900] focus:border-[#ffb900] placeholder:text-gray-400 text-base font-medium"
      />
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prev}
          className="transition-all duration-200 hover:bg-gray-200"
        >
          Geri
        </Button>
        <Button
          onClick={handleNext}
          className="bg-[#ffb900] hover:bg-[#ffde59] text-[#002133] font-semibold px-6 py-2 transition-all duration-300"
        >
          Devam Et
        </Button>
      </div>
    </div>
  );
}
