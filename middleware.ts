import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios"
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (!token && pathname==="/") {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (token && pathname === "/api/auth/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if(!token &&pathname.startsWith("/chat")) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  return NextResponse.next(); 
}

export const config = {
  matcher: ["/api/auth/signin", "/","/chat/:path","/chat"],
};
