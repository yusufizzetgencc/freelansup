"use client";
import { useState } from "react";
import type { Expertise } from "@/types/profile";

export default function ExpertiseTags({
  tags,
  onChange,
}: {
  tags: Expertise[];
  onChange: (v: Expertise[]) => void;
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input && !tags.some((tag) => tag.name === input)) {
      const newTag: Expertise = {
        id: crypto.randomUUID(),
        name: input,
        userId: "",
      };
      onChange([...tags, newTag]);
      setInput("");
    }
  };

  return (
    <div className="space-y-2 p-4 bg-white rounded-lg shadow-md">
      <label className="font-semibold text-lg text-gray-800">
        Uzmanlık Alanları
      </label>
      <div className="flex gap-2">
        <input
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
          placeholder="Yeni uzmanlık ekle"
        />
        <button
          onClick={addTag}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Ekle
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
