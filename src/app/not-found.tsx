"use client";

import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-yellow-100 via-yellow-50 to-white px-6 text-center">
      <h1 className="text-9xl font-extrabold text-yellow-400 drop-shadow-lg select-none mb-6">
        404
      </h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </p>
      <p className="max-w-md text-gray-600 mb-8">
        Sayfa taşınmış olabilir veya URL yanlış olabilir. Ana sayfaya dönmeyi
        deneyebilirsiniz.
      </p>
      <Link
        href="/"
        className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
      >
        Ana Sayfaya Dön
      </Link>
    </main>
  );
};

export default NotFoundPage;
