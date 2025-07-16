"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#002133] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white text-[#002133] rounded-lg shadow-md p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
