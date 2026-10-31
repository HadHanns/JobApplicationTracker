import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /login
     * - /api/auth/*
     * - /_next/* (static files, image optimization)
     * - /favicon.ico, /Offerly.png, static images/templates
     */
    "/((?!login|api/auth|_next/static|_next/image|favicon.ico|Offerly.*|templates|images).*)",
  ],
};

