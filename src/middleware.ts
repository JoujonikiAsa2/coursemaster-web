import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const currentRoute = request.nextUrl.pathname;

    const token = request.cookies.get("accessToken")?.value ?? null;
    const role = request.cookies.get("role")?.value ?? null;

    const isPublicRoute =
        currentRoute === "/login" ;

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isPublicRoute) {
        return NextResponse.redirect(
            new URL(`/dashboard/${role?.toLowerCase()}/my-course`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
        "/checkout/:path*",
        "/courses/checkout/:path*", 
    ],
};
