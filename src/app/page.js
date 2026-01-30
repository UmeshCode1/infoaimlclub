import Link from "next/link";
import { getLinks, getAnnouncements } from "@/lib/server-appwrite";
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
    Download
} from "lucide-react";

export const dynamic = 'force-dynamic';

const ICON_MAP = {
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
    whatsapp: MessageCircle,
};

function BentoCard({ children, className = "", delay = 0 }) {
    return (
        <div
            className={`glass-card p-6 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)] group ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default async function Home() {
    const links = await getLinks();
    const announcement = await getAnnouncements();

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col items-center">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[#050505] -z-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-600/20 blur-[120px] rounded-full -z-10 opacity-30 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10 opacity-20" />

            {/* Navbar */}
            <nav className="w-full max-w-4xl px-6 py-8 flex justify-between items-center z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <ShieldCheck className="text-white w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        <span className="text-pink-500">Info</span>.AIMLClub
                    </span>
                </div>
                <Link
                    href="/admin"
                    className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/5 text-sm font-medium transition-colors backdrop-blur-md"
                >
                    Auth Portal
                </Link>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 w-full max-w-4xl px-6 pt-12 pb-32 flex flex-col items-center">

                {/* Hero Section */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                        System Operational
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4 pb-2">
                        The Central <br />
                        <span className="text-glow text-white">Nervous System</span>
                    </h1>

                    <p className="max-w-xl mx-auto text-lg text-stone-400 leading-relaxed">
                        Official digital governance & resource hub for the <br />
                        <span className="text-white font-medium">AI & Machine Learning Club</span>.
                    </p>
                </div>

                {/* Dynamic Announcement Banner */}
                {announcement && (
                    <div className="w-full mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="relative group overflow-hidden rounded-2xl border border-pink-500/30 bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-1">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-[#0A0A0A] rounded-xl px-6 py-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
                                        <Megaphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm md:text-base">{announcement.title}</h3>
                                        <p className="text-xs text-stone-400 line-clamp-1">{announcement.message}</p>
                                    </div>
                                </div>
                                {announcement.url && (
                                    <a href={announcement.url} target="_blank" className="shrink-0 px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-stone-200 transition-colors">
                                        View Details
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Links Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    {links.map((link, i) => {
                        const Icon = ICON_MAP[link.icon_key] || ExternalLink;
                        return (
                            <a
                                key={link.$id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <BentoCard delay={i * 100} className="flex items-center gap-5 h-full hover:bg-white/[0.03]">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-pink-500/30 transition-all duration-300">
                                        <Icon className="w-6 h-6 text-stone-300 group-hover:text-pink-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white group-hover:text-pink-200 transition-colors">{link.title}</h3>
                                        <p className="text-sm text-stone-500 group-hover:text-stone-400">Tap to connect</p>
                                    </div>
                                    <ExternalLink className="absolute top-6 right-6 w-4 h-4 text-stone-600 group-hover:text-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                                </BentoCard>
                            </a>
                        );
                    })}
                </div>

                {/* Ecosystem Grid */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                    {[
                        { label: "Community", icon: MessageCircle, href: "#", active: false },
                        { label: "Events", icon: Megaphone, href: "#", active: false },
                        { label: "Resources", icon: Download, href: "#", active: false },
                        { label: "Governance", icon: BookOpen, href: "#", active: false },
                    ].map((item, i) => (
                        <div key={i} className={`p-4 rounded-xl border ${item.active ? 'border-pink-500/30 bg-pink-500/5 cursor-pointer hover:bg-pink-500/10' : 'border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed'} flex flex-col items-center justify-center gap-2 transition-all`}>
                            <item.icon className={`w-5 h-5 ${item.active ? 'text-pink-400' : 'text-stone-600'}`} />
                            <span className="text-xs font-medium text-stone-400">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <footer className="w-full border-t border-white/5 pt-12 flex flex-col items-center text-center">
                    <p className="text-stone-500 text-sm mb-4">
                        © {new Date().getFullYear()} AI & Machine Learning Club.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-medium text-stone-600">
                        <Link href="/admin" className="hover:text-pink-500 transition-colors">Admin Console</Link>
                        <span>•</span>
                        <a href="https://github.com/UmeshCode1" target="_blank" className="hover:text-pink-500 transition-colors">Developed by <span className="text-stone-400">Umesh Patel</span></a>
                    </div>
                </footer>
            </main>
        </div>
    );
}
