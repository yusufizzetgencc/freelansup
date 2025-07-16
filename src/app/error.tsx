"use client";

import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-red-100 via-red-50 to-white px-6 text-center">
      <h1 className="text-9xl font-extrabold text-red-400 drop-shadow-lg select-none mb-6">
        500
      </h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Bir şeyler ters gitti.
      </p>
      <p className="max-w-md text-gray-600 mb-8">
        Sunucuda bir hata oluştu. Lütfen bir süre sonra tekrar deneyin ya da ana
        sayfaya dönün.
      </p>
      <Link
        href="/"
        className="inline-block bg-red-400 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-red-500 transition"
      >
        Ana Sayfaya Dön
      </Link>
    </main>
  );
};

export default ErrorPage;
