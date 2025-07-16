"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, User } from "lucide-react";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      usernameOrEmail: formData.usernameOrEmail,
      password: formData.password,
    });

    if (res?.error) {
      Swal.fire({
        icon: "error",
        title: "Hatalı Giriş",
        text: res.error || "Kullanıcı adı veya şifre hatalı.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Giriş Başarılı!",
        text: "Yönlendiriliyorsunuz...",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/dashboard";
      });
    }
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
      {/* Email veya kullanıcı adı */}
      <div className="relative">
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="E-posta veya Kullanıcı Adı"
          value={formData.usernameOrEmail}
          onChange={handleChange}
          className="w-full px-4 py-2 pl-10 rounded border border-gray-300 focus:outline-none focus:border-[#ffb900] text-sm"
        />
        <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* Şifre */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 pl-10 pr-10 rounded border border-gray-300 focus:outline-none focus:border-[#ffb900] text-sm"
        />
        <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Giriş butonu */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ffb900] hover:bg-[#ffde59] text-[#002133] font-semibold py-2 rounded transition duration-200 disabled:opacity-50"
      >
        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
      </button>

      {/* Kayıt linki */}
      <p className="text-sm text-center text-gray-600 mt-2">
        Hesabın yok mu?{" "}
        <a href="/register" className="text-[#ffb900] hover:underline">
          Kayıt Ol
        </a>
      </p>
    </motion.form>
  );
};

export default LoginForm;
