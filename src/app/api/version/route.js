import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const about = await prisma.about.findFirst({ select: { updatedAt: true } });
        return NextResponse.json({ version: about?.updatedAt || Date.now() });
    } catch (e) {
        return NextResponse.json({ version: Date.now() });
    }
}
