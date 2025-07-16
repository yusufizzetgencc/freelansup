"use client";

import Link from "next/link";
import {
  Home,
  CreditCard,
  ShoppingCart,
  Megaphone,
  MessageCircle,
  Star,
} from "lucide-react";
import MobileMenu from "../layout/MobileMenu";

interface SidebarProps {
  isOpen?: boolean;
}

const DashboardSidebar = ({ isOpen = false }: SidebarProps) => {
  return (
    <div className="relative">
      <MobileMenu />
      <aside
        className={`${
          isOpen
            ? "fixed inset-y-0 left-0 z-49 w-64 bg-[#002133] text-white p-4 space-y-3"
            : "hidden lg:fixed lg:top-0 lg:left-0 lg:z-40 lg:w-64 lg:h-full lg:pt-16 lg:bg-[#002133] lg:text-white lg:flex lg:flex-col lg:p-4 lg:space-y-4"
        } transition-transform duration-300`}
      >
        <nav className="space-y-2">
          <SidebarItem
            icon={<Home size={18} />}
            label="Ana Sayfa"
            href="/dashboard"
          />
          <SidebarItem
            icon={<ShoppingCart size={18} />}
            label="Siparişlerim"
            href="/dashboard/orders"
          />
          <SidebarItem
            icon={<CreditCard size={18} />}
            label="Bakiyem"
            href="/dashboard/balance"
          />
          <SidebarItem
            icon={<Megaphone size={18} />}
            label="Teklifler"
            href="/dashboard/offers"
          />
          <SidebarItem
            icon={<MessageCircle size={18} />}
            label="Topluluk Kuralları"
            href="/dashboard/rules"
          />
          <SidebarItem
            icon={<Megaphone size={18} />}
            label="İlanlarım"
            href="/dashboard/ads"
          />
          <SidebarItem
            icon={<Megaphone size={18} />}
            label="İlanlar"
            href="/dashboard/public-ads"
          />
          <SidebarItem
            icon={<Star size={18} />}
            label="Değerlendirmeler"
            href="/dashboard/reviews"
          />
        </nav>
      </aside>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => (
  <Link
    href={href}
    className="mt-3 flex items-center gap-3 px-3 py-3 rounded-md hover:bg-[#ffb900] hover:text-[#002133] transition"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export default DashboardSidebar;
