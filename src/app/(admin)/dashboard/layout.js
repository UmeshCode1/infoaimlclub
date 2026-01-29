"use client";

import { useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ProtectedLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();
                setLoading(false);
            } catch (error) {
                router.replace('/admin/login');
            }
        };
        checkSession();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-stone-200 font-sans selection:bg-pink-500/30">
            {children}
        </div>
    );
}
