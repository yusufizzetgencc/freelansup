import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/login", "/register"];
  const isPublic = publicPaths.includes(pathname);

  // Giriş yaptıysa ama public sayfaya erişmeye çalışıyorsa -> dashboard'a yönlendir
  if (isAuth && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Giriş yapmadıysa ama korumalı sayfaya erişmeye çalışıyorsa -> login'e yönlendir
  if (!isAuth && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
