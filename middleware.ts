import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  const { pathname } = req.nextUrl;

  // If not authenticated and trying to access home page, redirect to /signin
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // If authenticated and trying to access /signin, redirect to home page
  if (token && pathname === "/api/auth/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // Continue request normally
}

export const config = {
  matcher: ["/api/auth/signin", "/"], // Apply middleware only to home and signin pages
};
