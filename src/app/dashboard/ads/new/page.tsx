// /src/app/dashboard/ads/new/page.tsx
"use client";

import StepCategory from "@/components/dashboard/ads/new/StepCategory";
import StepImageUpload from "@/components/dashboard/ads/new/StepImageUpload";
import StepPackages from "@/components/dashboard/ads/new/StepPackages";
import StepPreview from "@/components/dashboard/ads/new/StepPreview";
import StepPublish from "@/components/dashboard/ads/new/StepPublish";
import StepSubCategory from "@/components/dashboard/ads/new/StepSubCategory";
import StepTitleDescription from "@/components/dashboard/ads/new/StepTitleDescription";
import { useState } from "react";

const steps = [
  "Kategori",
  "Alt Kategori",
  "İlan Bilgileri",
  "Paketler",
  "Görsel",
  "Önizleme",
  "Yayınla",
];

export default function AdCreatePage() {
  const [step, setStep] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [packages, setPackages] = useState<
    {
      name: string;
      title: string;
      description: string;
      price: number;
      deliveryTime: string;
    }[]
  >([
    {
      name: "Temel Paket",
      title: "",
      description: "",
      price: 0,
      deliveryTime: "",
    },
    {
      name: "Orta Seviye Paket",
      title: "",
      description: "",
      price: 0,
      deliveryTime: "",
    },
    {
      name: "Profesyonel Paket",
      title: "",
      description: "",
      price: 0,
      deliveryTime: "",
    },
  ]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <div className="mb-6 text-center text-xl font-bold text-[#002133]">
        {steps[step]}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all animate-fade-in">
        {step === 0 && (
          <StepCategory next={next} setCategoryId={setCategoryId} />
        )}
        {step === 1 && (
          <StepSubCategory
            next={next}
            prev={prev}
            categoryId={categoryId}
            setSubCategoryId={setSubCategoryId}
          />
        )}
        {step === 2 && (
          <StepTitleDescription
            next={next}
            prev={prev}
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
          />
        )}
        {step === 3 && (
          <StepPackages
            next={next}
            prev={prev}
            packages={packages}
            setPackages={setPackages}
          />
        )}
        {step === 4 && (
          <StepImageUpload
            image={image}
            setImage={setImage}
            imageFile={imageFile}
            setImageFile={setImageFile}
            next={next}
            prev={prev}
          />
        )}
        {step === 5 && (
          <StepPreview
            next={next}
            prev={prev}
            title={title}
            description={description}
            category={categoryId}
            subCategory={subCategoryId}
            image={image}
            packages={packages}
          />
        )}
        {step === 6 && (
          <StepPublish
            prev={prev}
            title={title}
            description={description}
            category={categoryId}
            subCategory={subCategoryId}
            image={image}
            packages={packages}
          />
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Adım {step + 1} / {steps.length}
      </div>
    </div>
  );
}
