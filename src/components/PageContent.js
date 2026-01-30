"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Instagram,
    Linkedin,
    Github,
    MessageCircle,
    BookOpen,
    Mail,
    ExternalLink,
    ShieldCheck,
    Megaphone,
    Download,
    Terminal,
    Cpu,
    Globe,
    Zap,
    ChevronRight,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const ICON_MAP = {
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
    whatsapp: MessageCircle,
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function PageContent({ links, announcement }) {
    const [mounted, setMounted] = useState(false);
    const [systemLogs, setSystemLogs] = useState([]);

    useEffect(() => {
        setMounted(true);
        const logs = [
            "Initializing Neural Nexus...",
            "Connecting to Appwrite Cluster...",
            "Syncing community_links...",
            "Hydrating Governance protocols...",
            "System Ready."
        ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                setSystemLogs(prev => [...prev, logs[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen overflow-hidden selection:bg-pink-500/30 selection:text-pink-200">
            {/* Dynamic Background */}
            <div className="fixed inset-0 bg-[#050505] -z-20 cyber-grid opacity-20" />
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] -z-10" />

            {/* Animated Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-600/20 blur-[120px] rounded-full -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full -z-10"
            />

            {/* Floating Scanline */}
            <div className="scanline" />

            {/* Modern Fixed Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 w-full z-[100] px-6 py-4"
            >
                <div className="max-w-6xl mx-auto flex justify-between items-center glass-card px-4 md:px-6 py-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl">
                    <div className="flex items-center gap-4 group">
                        <div className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-1"
                            >
                                <img src="/college_logo.png" alt="OCT Logo" className="w-full h-full object-contain" />
                            </motion.div>
                            <div className="h-6 w-px bg-white/10 hidden sm:block" />
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-1"
                            >
                                <img src="/aiml_club_logo.png" alt="AIML Club Logo" className="w-full h-full object-contain" />
                            </motion.div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base md:text-lg leading-none tracking-tight text-white group-hover:text-pink-400 transition-colors">
                                Info<span className="text-stone-500">.</span>Platform
                            </span>
                            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-stone-500 font-bold whitespace-nowrap">AIML Club Hub @ OCT</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
                        <a href="#" className="hover:text-white transition-colors">Ecosystem</a>
                        <a href="#" className="hover:text-white transition-colors">Governance</a>
                        <a href="#" className="hover:text-white transition-colors">Status</a>
                    </div>

                    <Link
                        href="/admin"
                        className="group relative px-5 py-2 rounded-xl bg-white text-black text-xs font-bold transition-all hover:scale-105 active:scale-95 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 text-black" />
                            Auth Portal
                        </span>
                    </Link>
                </div>
            </motion.nav>

            {/* Main Container */}
            <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-40">

                {/* New Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-12 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 animate-pulse-soft">
                            <Zap className="w-3 h-3 fill-pink-500" />
                            v2.0 Hyper-Premium
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
                            The Central <br />
                            <span className="text-glow animate-float inline-block">Nervous</span> <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-stone-600">System.</span>
                        </h1>

                        <p className="max-w-2xl text-lg text-stone-400 leading-relaxed mb-8 mx-auto lg:mx-0">
                            A high-performance command center for the <span className="text-white font-medium">AI & Machine Learning Club</span>.
                            Bridging intelligence, community, and governance through a high-frequency digital lattice.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 rounded-2xl bg-pink-600 text-white font-bold text-sm shadow-[0_0_30px_-5px_rgba(236,72,153,0.5)] hover:bg-pink-500 transition-all flex items-center gap-2"
                            >
                                Get Started <ChevronRight className="w-4 h-4" />
                            </motion.button>
                            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-[#050505] bg-stone-800" />
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-stone-500 underline decoration-pink-500/50">43+ Members Online</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Dynamic Log Feed */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-16 glass-card p-4 rounded-2xl border border-white/5 bg-stone-900/30 overflow-hidden"
                >
                    <div className="flex items-center gap-2 mb-3 px-2">
                        <Terminal className="w-4 h-4 text-pink-500" />
                        <span className="text-[10px] uppercase tracking-tighter font-bold text-stone-500">System Logs / STDOUT</span>
                    </div>
                    <div className="space-y-1 font-mono text-[11px]">
                        {systemLogs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <span className="text-pink-500 opacity-50">&gt;</span>
                                <span className="text-stone-400">{log}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Announcement Blade */}
                <AnimatePresence>
                    {announcement && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full mb-16"
                        >
                            <div className="relative group p-[1px] rounded-3xl bg-gradient-to-r from-pink-500 via-transparent to-violet-500 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative glass-card bg-[#080808] rounded-[23px] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-start gap-5">
                                        <div className="p-4 bg-pink-500/10 rounded-2xl text-pink-500 shadow-inner">
                                            <Megaphone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">New Protocol</span>
                                                <span className="w-1 h-1 rounded-full bg-stone-700" />
                                                <span className="text-[10px] font-medium text-stone-500">Broadcast ID: {announcement.$id.slice(-6).toUpperCase()}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-1">{announcement.title}</h3>
                                            <p className="text-sm text-stone-400 max-w-xl leading-relaxed">{announcement.message}</p>
                                        </div>
                                    </div>
                                    {announcement.url && (
                                        <motion.a
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            href={announcement.url}
                                            target="_blank"
                                            className="group/btn px-6 py-3 bg-white text-black text-xs font-black rounded-xl flex items-center gap-2 hover:bg-white/90 transition-all shadow-xl"
                                        >
                                            OPEN UPLINK <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Links Grid - The Nexus */}
                <div className="mb-32">
                    <div className="flex items-center justify-between mb-10 px-2">
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Community Nexus</h2>
                            <p className="text-xs text-stone-500 font-medium">Access primary operational links</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-500 select-none cursor-not-allowed">
                                <ChevronLeft className="w-4 h-4" />
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {links.map((link, i) => {
                            const Icon = ICON_MAP[link.icon_key] || Globe;
                            return (
                                <motion.a
                                    key={link.$id}
                                    variants={itemVariants}
                                    href={link.url}
                                    target="_blank"
                                    className="group block h-full"
                                >
                                    <div className="glass-card p-6 h-full rounded-3xl flex flex-col items-start gap-4 relative overflow-hidden">
                                        {/* Hover Glow Effect */}
                                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500/10 group-hover:border-pink-500/30 transition-all duration-500">
                                            <Icon className="w-6 h-6 text-stone-400 group-hover:text-pink-400 transition-colors" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-lg text-white group-hover:text-pink-100 transition-colors">{link.title}</h3>
                                                <ExternalLink className="w-3.5 h-3.5 text-stone-600 group-hover:text-pink-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                            </div>
                                            <p className="text-xs text-stone-500 group-hover:text-stone-400 leading-relaxed font-medium capitalize">
                                                Resolve to {link.icon_key} uplink
                                            </p>
                                        </div>

                                        <div className="w-full mt-4 flex items-center justify-between pt-4 border-t border-white/5">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-600 group-hover:text-pink-900 transition-colors">active bridge</span>
                                            <div className="flex shrink-0 -space-x-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                                                {[1, 2].map(j => (
                                                    <div key={j} className="w-4 h-4 rounded-full border border-[#050505] bg-stone-700" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Status System Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                    {[
                        { label: "Neural Latency", value: "24ms", icon: Cpu, color: "text-blue-400" },
                        { label: "Club Members", value: "43", icon: Users, color: "text-pink-400" },
                        { label: "Uptime Protocol", value: "99.9%", icon: ShieldCheck, color: "text-green-400" },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-6 rounded-3xl flex items-center gap-5 border border-white/5 bg-stone-900/10">
                            <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} border border-current/20`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-0.5">{stat.label}</p>
                                <p className="text-xl font-bold text-white tracking-tight">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ecosystem Grid - Expanded */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white tracking-tighter mb-4">Secondary Subsystems</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-violet-600 mx-auto rounded-full" />
                </div>

                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
                    {[
                        { label: "Community", icon: MessageCircle, desc: "Global Chat Hub", active: true },
                        { label: "Events", icon: Megaphone, desc: "Core Activations", active: false },
                        { label: "Resources", icon: Download, desc: "Knowledge Vault", active: false },
                        { label: "Governance", icon: BookOpen, desc: "Policy Matrix", active: false },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={item.active ? { y: -5 } : {}}
                            className={`p-6 rounded-3xl border text-left transition-all relative group ${item.active ? 'border-pink-500/30 bg-pink-500/5 cursor-pointer hover:bg-pink-500/10' : 'border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed'}`}
                        >
                            <item.icon className={`w-6 h-6 mb-4 ${item.active ? 'text-pink-400 group-hover:scale-110 transition-transform' : 'text-stone-600'}`} />
                            <h3 className="text-sm font-bold text-white mb-1">{item.label}</h3>
                            <p className="text-[10px] text-stone-500 font-medium uppercase tracking-tight">{item.desc}</p>
                            {!item.active && <span className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-stone-700">Offline</span>}
                        </motion.div>
                    ))}
                </div>

                {/* Hyper-Premium Footer */}
                <footer className="relative mt-20 p-12 glass-card rounded-[40px] border border-white/10 overflow-hidden text-center flex flex-col items-center">
                    {/* Background pattern for footer */}
                    <div className="absolute inset-0 cyber-grid opacity-5" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8 justify-center">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center p-2 shadow-lg shadow-pink-500/20">
                                <ShieldCheck className="text-white w-full h-full" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">AI & Machine Learning Club</span>
                        </div>

                        <div className="flex gap-4 mb-10 justify-center">
                            {[Instagram, Linkedin, Github, Mail].map((Icon, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-stone-400 hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/10 cursor-pointer transition-all">
                                    <Icon className="w-4 h-4" />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <p className="text-stone-500 text-sm max-w-lg">
                                The legal entity and governance hub for AIML Club at Oriental College of Technology, Bhopal.
                                Built with cutting-edge neural architectures.
                            </p>
                            <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-stone-700">
                                <Link href="/admin" className="hover:text-pink-900 transition-all">TERMINAL ACCESS</Link>
                                <span>•</span>
                                <a href="https://github.com/UmeshCode1" target="_blank" className="hover:text-pink-900 transition-all">DESIGN BY @UMESHCODE1</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Decorative Elements */}
            <div className="fixed top-0 right-0 p-8 z-0 opacity-10 pointer-events-none hidden md:block">
                <div className="font-mono text-[83px] font-black leading-none text-white tracking-widest">
                    AIML<br />CLUB
                </div>
            </div>
        </div>
    );
}

function Lock({ className }) {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
}

function ChevronLeft({ className }) {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
}

function Users({ className }) {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
}
