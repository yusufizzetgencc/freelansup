import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-[#002133] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white text-[#002133] rounded-lg shadow-md p-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
