'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RealtimeRefresh({ initialVersion }) {
    const router = useRouter();

    useEffect(() => {
        // Poll for updates every 3 seconds
        const interval = setInterval(() => {
            fetch('/api/version', { cache: 'no-store' })
                .then(res => res.json())
                .then(data => {
                    // If the database version is newer than when this page loaded, trigger a soft refresh
                    if (data.version && data.version !== initialVersion) {
                        console.log('New data detected, refreshing page structure...');
                        router.refresh();
                    }
                })
                .catch(e => {
                    // Ignore fetch errors to prevent console spam
                });
        }, 3000);

        return () => clearInterval(interval);
    }, [initialVersion, router]);

    return null;
}
