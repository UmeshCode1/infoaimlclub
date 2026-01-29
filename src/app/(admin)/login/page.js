"use client";

import { useState } from 'react';
import { account } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await account.createEmailPasswordSession(email, password);
            // Check if user has admin label/team? For now, just redirect.
            // Ideally we check team membership here or in middleware.
            router.push('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md p-8 glass-card rounded-2xl border border-stone-800 bg-stone-950/50 backdrop-blur-xl relative z-10 mx-4">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-900 border border-stone-800 mb-4 shadow-lg shadow-pink-500/5">
                        <ShieldCheck className="w-8 h-8 text-pink-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
                    <p className="text-stone-500 text-sm mt-2">Restricted Access • Core Team Only</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">Email Identity</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-stone-900/50 border border-stone-800 rounded-xl px-4 py-3 text-stone-200 outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all font-mono text-sm placeholder:text-stone-700"
                            placeholder="admin@aimlclub.tech"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">Passcode</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-stone-900/50 border border-stone-800 rounded-xl px-4 py-3 text-stone-200 outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all font-mono text-sm placeholder:text-stone-700"
                            placeholder="••••••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold tracking-wide shadow-lg shadow-pink-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'AUTHENTICATE'}
                    </button>
                </form>
            </div>
        </div>
    );
}
