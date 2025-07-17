"use client";
import { useState } from "react";
import type { Service } from "@/types/profile";

export default function ServicesList({
  services,
  onChange,
}: {
  services: Service[];
  onChange: (v: Service[]) => void;
}) {
  const [input, setInput] = useState("");

  const addService = () => {
    if (input && !services.some((s) => s.name === input)) {
      const newService: Service = {
        id: crypto.randomUUID(),
        name: input,
        userId: "",
      };
      onChange([...services, newService]);
      setInput("");
    }
  };

  return (
    <div className="space-y-2 p-4 bg-white rounded-lg shadow-md">
      <label className="font-semibold text-lg text-gray-800">Hizmetler</label>
      <div className="flex gap-2">
        <input
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addService()}
          placeholder="Yeni hizmet ekle"
        />
        <button
          onClick={addService}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Ekle
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <span
            key={service.id}
            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
          >
            {service.name}
          </span>
        ))}
      </div>
    </div>
  );
}
