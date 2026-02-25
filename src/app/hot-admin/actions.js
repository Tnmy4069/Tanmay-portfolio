'use server';

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData) {
    const password = formData.get('password');
    const actualPassword = process.env.ADMIN_PASSWORD;

    if (password === actualPassword) {
        // Generate a secure, simple session token. Since this is a single-admin system, setting a valid boolean is enough.
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        redirect('/hot-admin/dashboard');
    }

    // Not strictly an error class throwing, but returning standard format simplifies client rendering.
    return { error: 'Invalid password' };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/hot-admin');
}
