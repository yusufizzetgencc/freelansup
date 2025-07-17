"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { UserCircle, ChevronDown } from "lucide-react";

interface UserSession {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
}

const UserMenu = ({ user }: { user: UserSession }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-2 cursor-pointer hover:opacity-90 transition">
      <div
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user.image ? (
          <Image
            src={user.image}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-11 h-11 rounded-full object-cover border border-yellow-400"
            priority
          />
        ) : (
          <UserCircle size={24} className="text-[#ffde59]" />
        )}
        <span className="text-sm">
          {user?.username || user?.name || "Kullanıcı"}
        </span>
        <ChevronDown size={16} />
      </div>

      {isOpen && (
        <div className="absolute top-14 right-0 w-56 bg-white text-[#002133] rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition-colors text-sm"
          >
            👤 Profilim
          </Link>
          <Link
            href="/dashboard/account"
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition-colors text-sm"
          >
            ⚙️ Hesabım
          </Link>
          <div className="border-t border-gray-200" />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 transition-colors text-sm text-left"
          >
            🚪 Oturumu Kapat
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
