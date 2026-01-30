"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBanner from "./AnnouncementBanner";
import EventBlade from "./EventBlade";
import LinkCard from "./LinkCard";
import LiveStatus from "./LiveStatus";
import {
    FileText,
    Download,
    Moon,
    Sun,
    Search,
    Filter,
    ShieldCheck,
    Mail,
    Users,
    ArrowUp,
    Camera,
    Info
} from "lucide-react";

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

    const categories = ["core", "community", "resources", "subbrand"];
    const allCategories = ["all", ...categories];

    const CAPTIONS = {
        core: "Primary and official access points governed by the AIML Club.",
        community: "Verified social and communication channels of the AIML Club ecosystem.",
        resources: "Learning materials, institutional documents, and shared digital assets.",
        subbrand: "MEDIA DIVISION – PHOTOPIA"
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
    };

    return (
        <div className="w-full flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-primary/20">
            {/* Header */}
            <header className="sticky top-0 z-[100] w-full border-b border-border bg-background/95 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img src="/college_logo.png" alt="Oriental College of Technology" className="h-8 w-auto" />
                            <div className="w-px h-6 bg-border" />
                            <img src="/aiml_club_logo.png" alt="AI & Machine Learning Club" className="h-8 w-auto" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-3 rounded-xl hover:bg-muted transition-all border border-border/50 active:scale-90"
                            aria-label="Toggle visual theme mode"
                        >
                            <Sun className="h-5 w-5 dark:hidden text-primary" />
                            <Moon className="h-5 w-5 hidden dark:block text-primary" />
                        </button>
                        <Link
                            href="/admin"
                            className="text-[11px] font-black hover:text-primary transition-all uppercase tracking-widest border border-border px-5 py-3 rounded-xl bg-muted/30 hover:bg-muted active:scale-90"
                            aria-label="Access Admin Portal"
                        >
                            Portal
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-32 flex-grow w-full">
                <AnnouncementBanner announcement={announcement} />

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 space-y-4"
                >
                    <div className="space-y-2">
                        <p className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3" />
                            Governance Platform · Faculty Coordinated · OCT Bhopal
                        </p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            AI & Machine Learning Club – OCT | Information & Access Gateway
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                        Official platform for verified links, resources, announcements, and community access of the AIML Club, Oriental College of Technology.
                    </p>
                </motion.div>

                <LiveStatus />

                <EventBlade event={activeEvent} links={links} />

                {/* Search & Filter Matrix */}
                <div className="mb-16 space-y-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Scan official links and resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-muted/20 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-sm font-medium"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {allCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border active:scale-95 ${activeCategory === cat
                                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                                    : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/30'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Matrix */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-20"
                >
                    <AnimatePresence mode="popLayout">
                        {categories.map((cat) => {
                            const catLinks = groupedLinks[cat];
                            if (!catLinks || catLinks.length === 0 || cat === 'event') return null;

                            return (
                                <motion.section
                                    key={cat}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-foreground">{cat}</h2>
                                            <div className="flex-1 h-px bg-border/50" />
                                        </div>
                                        {cat === 'subbrand' ? (
                                            <div className="space-y-1">
                                                <p className="text-sm font-black text-primary uppercase tracking-widest">{CAPTIONS.subbrand}</p>
                                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-2">
                                                    Official Media Wing of the AI & Machine Learning Club
                                                    <span className="w-1 h-1 rounded-full bg-border" />
                                                    Photography · Design · Visual Documentation
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-xs text-muted-foreground font-medium italic">
                                                {CAPTIONS[cat]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {catLinks.sort((a, b) => a.order - b.order).map((link) => (
                                            <motion.div key={link.$id} variants={itemVariants} layout className="w-full">
                                                <LinkCard link={link} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.section>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Institutional Resources */}
                {resources && resources.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-32 space-y-8"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-foreground">RESOURCES</h2>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                            <p className="text-xs text-muted-foreground font-medium italic">
                                Learning materials, institutional documents, and shared digital assets.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map(res => (
                                <a
                                    key={res.$id}
                                    href={res.url || '#'}
                                    className="p-5 border border-border hover:border-primary/50 rounded-2xl flex items-center gap-4 group transition-all bg-card/60 hover:bg-card active:scale-[0.98]"
                                    aria-label={`Download resource: ${res.title}`}
                                >
                                    <div className="p-4 bg-muted rounded-xl text-muted-foreground group-hover:text-primary transition-all duration-300">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold group-hover:text-primary transition-colors">{res.title}</h3>
                                        <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60">{res.type} protocol</p>
                                    </div>
                                    <Download className="w-5 h-5 text-muted-foreground opacity-50 group-hover:opacity-100 transition-all" />
                                </a>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Personnel Directory */}
                {members && members.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-40 space-y-12"
                    >
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5">
                                <Users className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Authorized Council</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Personnel Directory</h2>
                        </div>

                        {(() => {
                            const faculty = members.filter(m => m.team === 'AIML_FACULTY');
                            const core = members.filter(m => m.team === 'AIML_CORE');
                            const otherTeams = [...new Set(members.filter(m => !['AIML_FACULTY', 'AIML_CORE'].includes(m.team)).map(m => m.team))];

                            return (
                                <div className="space-y-24">
                                    {/* High Command */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                        {faculty.map((m) => (
                                            <div key={m.$id} className="md:col-span-12 lg:col-span-4 p-8 rounded-3xl bg-card border border-primary/30 relative overflow-hidden group hover:border-primary transition-all duration-300">
                                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                                    <ShieldCheck className="w-12 h-12 text-primary" />
                                                </div>
                                                <div className="relative z-10 space-y-6">
                                                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl font-black text-primary border border-primary/20">
                                                        {m.name.charAt(0)}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="text-2xl font-black tracking-tight">{m.name}</h3>
                                                        <p className="text-xs text-primary font-bold uppercase tracking-widest">{m.role}</p>
                                                    </div>
                                                    <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-2">
                                                        <Mail className="w-3 h-3" /> {m.email}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {core.map((m) => (
                                            <div key={m.$id} className="md:col-span-6 lg:col-span-4 p-8 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                                                <div className="relative z-10 space-y-6">
                                                    <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-2xl font-black text-muted-foreground border border-border">
                                                        {m.name.charAt(0)}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="text-xl font-bold">{m.name}</h3>
                                                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{m.role}</p>
                                                    </div>
                                                    <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                                                        <span className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">CORE COMMAND</span>
                                                        <Users className="w-4 h-4 text-muted-foreground/30" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Division Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {otherTeams.map(team => {
                                            const teamMembers = members.filter(m => m.team === team);
                                            const teamName = team.replace('AIML_', '');
                                            return (
                                                <div key={team} className="space-y-6">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70">{teamName}</h3>
                                                        <div className="flex-1 h-px bg-primary/10" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        {teamMembers.map(m => (
                                                            <div key={m.$id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-transparent hover:border-border transition-all">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-xs font-black text-muted-foreground border border-border">
                                                                        {m.name.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="text-sm font-bold truncate max-w-[140px]">{m.name}</h4>
                                                                        <p className="text-[9px] text-muted-foreground uppercase font-medium">{m.role}</p>
                                                                    </div>
                                                                </div>
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

                {/* Governance System Matrix */}
                <div className="mt-48 pt-20 border-t border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left opacity-60">
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-3">Core Network</span>
                            <div className="flex items-center gap-2 justify-center md:justify-start font-mono">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse" />
                                <span className="text-[10px] font-bold tracking-tight text-foreground uppercase">SYSOPS: SECURE_PHASE_GOV</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-3">Protocol Build</span>
                            <span className="text-[10px] font-bold tracking-tight text-foreground uppercase">VERSION: 4.2.0_GOVERNANCE</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-3">Jurisdiction</span>
                            <span className="text-[10px] font-bold tracking-tight text-foreground uppercase">Oriental College of Technology</span>
                        </div>
                    </div>
                </div>
            </main>

            <AnimatePresence mode="wait">
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 p-5 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 border border-primary/20 z-[200] active:scale-90 transition-all group"
                        aria-label="Scroll back to top of page"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
