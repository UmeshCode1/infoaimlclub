"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBanner from "./AnnouncementBanner";
import EventBlade from "./EventBlade";
import LinkCard from "./LinkCard";
import LiveStatus from "./LiveStatus";
import { FileText, Download, Moon, Sun, Search, Filter, ShieldCheck, Mail, Users, ArrowUp } from "lucide-react";

export default function PageContent({ links, announcement, activeEvent, resources, members }) {
    const { theme, setTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    // Memoized Filtering Logic
    const filteredLinks = useMemo(() => {
        return links.filter(link => {
            const matchesSearch = (link.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                link.key?.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = activeCategory === "all" || link.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [links, searchQuery, activeCategory]);

    const groupedLinks = useMemo(() => {
        return filteredLinks.reduce((acc, link) => {
            if (!acc[link.category]) acc[link.category] = [];
            acc[link.category].push(link);
            return acc;
        }, {});
    }, [filteredLinks]);

    const categories = ["core", "community", "event", "resources", "subbrand"];
    const allCategories = ["all", ...categories];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="w-full flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-primary/20">
            {/* Header */}
            <header className="sticky top-0 z-[100] w-full border-b border-border bg-background/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img src="/college_logo.png" alt="OCT" className="h-7 w-auto md:h-8" />
                            <div className="w-px h-5 bg-border hidden md:block" />
                            <img src="/aiml_club_logo.png" alt="AIML Club" className="h-7 w-auto md:h-8" />
                        </div>
                        <div className="hidden sm:block text-left">
                            <h1 className="text-xs font-black tracking-tight uppercase">Governance Platform</h1>
                            <p className="text-[10px] text-muted-foreground font-bold">BY AIML CLUB @ OCT</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2.5 rounded-xl hover:bg-muted transition-all border border-border/50 active:scale-95"
                            aria-label="Toggle Theme"
                        >
                            <Sun className="h-4 w-4 dark:hidden text-primary" />
                            <Moon className="h-4 w-4 hidden dark:block text-primary" />
                        </button>
                        <Link href="/admin" className="text-[10px] font-black hover:text-primary transition-all uppercase tracking-[0.2em] border border-border px-4 py-2 rounded-xl bg-muted/30 hover:bg-muted active:scale-95">
                            Portal Access
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pt-12 pb-32 flex-grow w-full">
                <AnnouncementBanner announcement={announcement} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.9] lowercase">
                        High-Performance<br />
                        <span className="text-primary">Gateway.</span>
                    </h2>
                    <p className="text-muted-foreground text-base md:text-xl max-w-xl leading-relaxed italic">
                        Direct authorization to the <strong>AI & Machine Learning Club</strong> matrix.
                    </p>
                </motion.div>

                <LiveStatus />

                <EventBlade event={activeEvent} links={links} />

                {/* Search & Filter Matrix */}
                <div className="mb-16 space-y-8">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Scan Ecosystem Matrix... (e.g. Website, Profile)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-card/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-sm font-medium"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {allCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat
                                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                                    : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/30'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-24"
                >
                    <AnimatePresence mode="popLayout">
                        {categories.map((cat) => {
                            const catLinks = groupedLinks[cat];
                            if (!catLinks || catLinks.length === 0 || cat === 'event') return null;

                            return (
                                <motion.section
                                    key={cat}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Filter className="w-3.5 h-3.5" />
                                            <h3 className="text-xs font-black uppercase tracking-[0.4em]">{cat}</h3>
                                        </div>
                                        <div className="flex-1 h-px bg-border/50" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {catLinks.sort((a, b) => a.order - b.order).map((link) => (
                                            <motion.div key={link.$id} variants={itemVariants} layout>
                                                <LinkCard link={link} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.section>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Resources Section */}
                {resources && resources.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-32 space-y-10"
                    >
                        <div className="flex items-center gap-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Institutional Files</h3>
                            <div className="flex-1 h-px bg-border" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {resources.map(res => (
                                <a
                                    key={res.$id}
                                    href={res.url || '#'}
                                    className="p-5 border border-border hover:border-primary/50 rounded-2xl flex items-center gap-4 group transition-all bg-card/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]"
                                >
                                    <div className="p-3.5 bg-muted rounded-xl text-muted-foreground group-hover:text-primary transition-all duration-300">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{res.title}</h4>
                                        <span className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground/60">{res.type} protocol</span>
                                    </div>
                                    <Download className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                                </a>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Governance Council Section - Re-architected */}
                {members && members.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-40 space-y-16"
                    >
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Authorized Council</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black tracking-tighter">Personnel Directory.</h3>
                        </div>

                        {(() => {
                            const faculty = members.filter(m => m.team === 'AIML_FACULTY');
                            const core = members.filter(m => m.team === 'AIML_CORE');
                            const otherTeams = [...new Set(members.filter(m => !['AIML_FACULTY', 'AIML_CORE'].includes(m.team)).map(m => m.team))];

                            return (
                                <div className="space-y-24">
                                    {/* High Command Bento */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
                                        {faculty.map((m, idx) => (
                                            <div key={m.$id} className="md:col-span-12 lg:col-span-4 p-8 rounded-3xl bg-card border border-primary/30 relative overflow-hidden group hover:border-primary transition-all duration-500">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                                    <ShieldCheck className="w-12 h-12 text-primary" />
                                                </div>
                                                <div className="relative z-10">
                                                    <div className="w-20 h-20 rounded-2xl bg-primary/10 mb-6 flex items-center justify-center text-3xl font-black text-primary border border-primary/20">
                                                        {m.name.charAt(0)}
                                                    </div>
                                                    <h5 className="text-2xl font-black tracking-tight">{m.name}</h5>
                                                    <p className="text-xs text-primary font-bold uppercase tracking-widest mt-2">{m.role}</p>
                                                    <p className="text-[10px] text-muted-foreground font-medium mt-4 flex items-center gap-2">
                                                        <Mail className="w-3 h-3" /> {m.email}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {core.map((m, idx) => (
                                            <div key={m.$id} className="md:col-span-6 lg:col-span-4 p-8 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-primary/50 transition-all duration-500">
                                                <div className="relative z-10">
                                                    <div className="w-16 h-16 rounded-xl bg-muted mb-6 flex items-center justify-center text-2xl font-black text-muted-foreground border border-border group-hover:border-primary/20 group-hover:text-primary transition-all">
                                                        {m.name.charAt(0)}
                                                    </div>
                                                    <h5 className="text-xl font-bold">{m.name}</h5>
                                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-2">{m.role}</p>
                                                    <div className="mt-8 flex items-center justify-between">
                                                        <span className="text-[8px] font-black tracking-[0.2em] text-muted-foreground/40 uppercase">CORE COMMAND</span>
                                                        <Users className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary/40 transition-colors" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Division Matrix */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                        {otherTeams.map(team => {
                                            const teamMembers = members.filter(m => m.team === team);
                                            const teamName = team.replace('AIML_', '');
                                            return (
                                                <div key={team} className="space-y-6">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/70">{teamName}</h4>
                                                        <div className="flex-1 h-px bg-primary/10" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        {teamMembers.map(m => (
                                                            <div key={m.$id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-transparent hover:border-border hover:bg-muted/40 transition-all group/m cursor-default">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center text-xs font-black text-muted-foreground border border-border group-hover/m:text-primary group-hover/m:border-primary/30 transition-all">
                                                                        {m.name.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-bold truncate max-w-[120px]">{m.name}</p>
                                                                        <p className="text-[9px] text-muted-foreground uppercase font-medium">{m.role}</p>
                                                                    </div>
                                                                </div>
                                                                <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground/30 group-hover/m:text-primary/50 transition-colors" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.section>
                )}

                {/* System Status Footer */}
                <div className="mt-48 pt-20 border-t border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] block mb-3">Core Network</span>
                            <div className="flex items-center gap-2 justify-center md:justify-start font-mono">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse" />
                                <span className="text-[10px] font-bold tracking-tight text-foreground">SYSOPS: SECURE_V4</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] block mb-3">Protocol Build</span>
                            <span className="text-[10px] font-bold tracking-tight text-foreground">STABLE_PRODUCTION [4.1.2]</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] block mb-3">Bhopal Node</span>
                            <span className="text-[10px] font-bold tracking-tight text-foreground uppercase">Jurisdiction Active</span>
                        </div>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 p-4 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 border border-primary/20 z-[200] hover:scale-110 active:scale-90 transition-all group"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
