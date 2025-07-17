// ReviewList.tsx
import { Review } from "@prisma/client";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="space-y-4">
      <label className="font-semibold text-lg">Değerlendirmeler</label>
      {reviews.map((r) => (
        <div
          key={r.id}
          className="p-4 rounded-lg border shadow-sm bg-white dark:bg-zinc-800 dark:border-zinc-700"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-yellow-500 font-bold text-lg">⭐ {r.rating}</p>
            <span className="text-sm text-zinc-500">
              {new Date(r.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-zinc-800 dark:text-zinc-100">{r.text}</p>
        </div>
      ))}
    </div>
  );
}
