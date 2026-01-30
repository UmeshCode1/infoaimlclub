"use client";

import { useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { Shield, Lock, User, Loader2 } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await account.createEmailPasswordSession(email, password);
            router.replace("/admin");
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[#000000] text-[#ededed]">
            <div className="w-full max-w-md bg-stone-900/40 border border-[#222] p-10 rounded-2xl shadow-2xl backdrop-blur-xl">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-pink-500" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-white uppercase mb-2">Governance Access</h1>
                    <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Protocol Authorization Required</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-bold uppercase tracking-tighter">
                        ERROR: {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-600 block px-1">Uplink ID (Email)</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black border border-[#333] rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 outline-none transition-all"
                                placeholder="name@aimlclub.tech"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-600 block px-1">Access Cipher (Password)</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-[#333] rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-black text-xs uppercase tracking-[0.3em] rounded-xl shadow-lg shadow-pink-600/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authorize Link"}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-[#222] text-center">
                    <p className="text-[9px] text-[#444] uppercase tracking-widest font-black">
                        System authorized for AIML Club High-Command only.
                    </p>
                </div>
            </div>
        </div>
    );
}
