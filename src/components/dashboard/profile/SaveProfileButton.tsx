// SaveProfileButton.tsx
"use client";

export default function SaveProfileButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full sm:w-auto transition-all duration-200 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Kaydediliyor..." : "Profili Güncelle"}
    </button>
  );
}
