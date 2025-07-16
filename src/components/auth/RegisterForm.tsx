"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    image: "", // added
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedImage = selectedAvatar || uploadedImage || "";
      const submissionData = { ...formData, image: selectedImage };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Hata!",
          text: data.error || "Bir hata oluştu.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Başarılı!",
          text: "Kayıt başarılı!",
        }).then(() => {
          window.location.href = "/login";
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Sunucu Hatası",
        text: "Bir hata oluştu, lütfen tekrar deneyin.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Avatar Seçimi */}
      <div className="text-center mb-4">
        <p className="text-sm font-medium mb-2">Avatar seçiniz:</p>
        <div className="flex items-center justify-center gap-4">
          {[...Array(3)].map((_, i) => {
            const avatarSrc =
              i === 0
                ? "/images/male.png"
                : i === 1
                ? "/images/female.png"
                : uploadedImage;

            if (!avatarSrc) return null;

            return (
              <Image
                key={i}
                src={avatarSrc}
                alt="avatar"
                width={56}
                height={56}
                onClick={() => setSelectedAvatar(avatarSrc)}
                className={`w-14 h-14 rounded-full border-2 cursor-pointer object-cover ${
                  selectedAvatar === avatarSrc ? "border-[#ffb900]" : "border-transparent"
                }`}
              />
            );
          })}

          {/* Kendi fotoğrafını yükle */}
          <label className="w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer text-sm text-gray-400 hover:border-[#ffb900] relative overflow-hidden">
            {!uploadedImage && "+"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const result = reader.result as string;
                    setUploadedImage(result);
                    setFormData({
                      ...formData,
                      image: result,
                    });
                    setSelectedAvatar(result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* İsim */}
      <div className="relative">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Hesabını Oluştur
        </h1>
        <input
          type="text"
          name="firstName"
          placeholder="Adınız"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 pl-10 rounded border border-gray-300 focus:outline-none focus:border-[#ffb900] text-sm"
        />
        <User className="absolute left-3 top-17 text-gray-400" size={18} />
      </div>

      {/* Soyisim */}
      <div className="relative">
        <input
          type="text"
          name="lastName"
          placeholder="Soyadınız"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-4 py-2 pl-10 rounded border border-gray-300 focus:outline-none focus:border-[#ffb900] text-sm"
        />
        <UserPlus className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* Kullanıcı Adı */}
      <div className="relative">
        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 pl-10 rounded border border-gray-300 focus:outline-none focus:border-[#ffb900] text-sm"
        />
        <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* E-posta */}
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 pl-10 rounded border border-gray-300 focus:outline-none focus:border-[#ffb900] text-sm"
        />
        <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
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

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ffb900] hover:bg-[#ffde59] text-[#002133] font-semibold py-2 rounded transition duration-200 disabled:opacity-50"
      >
        {loading ? "Kayıt Oluyor..." : "Kayıt Ol"}
      </button>

      {/* Giriş linki */}
      <p className="text-sm text-center text-gray-600 mt-2">
        Zaten hesabınız var mı?{" "}
        <a href="/login" className="text-[#ffb900] hover:underline">
          Giriş Yap
        </a>
      </p>
    </motion.form>
  );
};

export default RegisterForm;
