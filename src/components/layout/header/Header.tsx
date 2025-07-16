"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import Slogan from "./Slogan";
import AuthButtons from "./AuthButtons";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

const Header = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = !!session?.user;

  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-sm bg-gray-900/95 text-white shadow-md border-b-1">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between h-16" />
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-sm bg-gray-900/95 text-white shadow-md border-b-1">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Sol: Logo */}
        <div className="h-12 flex items-center">
          <Logo />
        </div>

        {/* Orta: Slogan ya da Arama */}
        <div className="flex-1 mx-4">
          {isLoggedIn ? <SearchBar /> : <Slogan />}
        </div>

        {/* Sağ: Auth buttons ya da User menu */}
        {isLoggedIn ? (
          <UserMenu
            user={{
              username:
                (session.user as { username?: string | null })?.username ??
                null,
              name: session.user?.name ?? null,
              email: session.user?.email ?? null,
              image: session.user?.image ?? null,
            }}
          />
        ) : (
          <AuthButtons />
        )}
      </div>
    </header>
  );
};

export default Header;
