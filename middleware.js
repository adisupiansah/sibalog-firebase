import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
    const cookieStore = cookies();
    const isLoggedIn = cookieStore.get("isLoggedIn")?.value === "true";

    const url = request.nextUrl.clone();

    // Redirect pengguna yang sudah login dari /auth ke /admin
    if (url.pathname.startsWith("/auth") && isLoggedIn) {
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    // Redirect pengguna yang belum login dari /admin ke /auth
    if (url.pathname.startsWith("/admin") && !isLoggedIn) {
        url.pathname = "/auth";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth", "/admin/:path*"], // Wildcard untuk semua rute di bawah /admin
};
