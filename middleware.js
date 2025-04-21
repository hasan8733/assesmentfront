import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Define protected routes
const protectedRoutes = ['/notes'];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    const cookies = req.cookies;
    const token = cookies['accessToken'];

    console.log("Token from cookies:", token);

    if (!token) {
      console.log("No token found, redirecting to login...");
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET); // Just for verification
    } catch (error) {
      console.log("Token verification failed, redirecting to login...", error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes'],
  runtime: 'nodejs',
};
