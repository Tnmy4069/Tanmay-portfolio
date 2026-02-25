import { NextResponse } from 'next/server';

export function middleware(request) {
    // Check if we are trying to access a protected route
    if (request.nextUrl.pathname.startsWith('/hot-admin/dashboard')) {
        const session = request.cookies.get('admin_session');

        // If no session exists, redirect back to login page
        if (!session) {
            return NextResponse.redirect(new URL('/hot-admin', request.url));
        }
    }

    // Otherwise continue request
    return NextResponse.next();
}

// Ensure middleware only runs on explicit routes to optimize performance
export const config = {
    matcher: ['/hot-admin/dashboard/:path*'],
};
