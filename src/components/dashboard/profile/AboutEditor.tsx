// AboutEditor.tsx
"use client";

import { FC } from "react";

interface AboutEditorProps {
  value: string;
  onChange: (v: string) => void;
}

const AboutEditor: FC<AboutEditorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Hakkımda
      </label>
      <textarea
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        rows={4}
        placeholder="Kendiniz hakkında kısa bir bilgi yazın..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default AboutEditor;
