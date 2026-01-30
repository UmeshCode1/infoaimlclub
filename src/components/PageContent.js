"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import AnnouncementBanner from "./AnnouncementBanner";
import EventBlade from "./EventBlade";
import LinkCard from "./LinkCard";
import { Globe, FileText, Download, Moon, Sun } from "lucide-react";

export default function PageContent({ links, announcement, activeEvent, resources }) {
    const { theme, setTheme } = useTheme();

    const groupedLinks = links.reduce((acc, link) => {
        if (!acc[link.category]) acc[link.category] = [];
        acc[link.category].push(link);
        return acc;
    }, {});

    const categories = ["core", "community", "event", "resources", "subbrand"];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <div className="w-full flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
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
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-muted transition-colors"
                        >
                            <Sun className="h-4 w-4 dark:hidden" />
                            <Moon className="h-4 w-4 hidden dark:block" />
                        </button>
                        <Link href="/admin" className="text-[10px] font-black hover:text-primary transition-all uppercase tracking-[0.2em] border border-border px-3 py-1.5 rounded bg-muted/50 hover:bg-muted">
                            Portal Access
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pt-12 pb-32 flex-grow">
                <AnnouncementBanner announcement={announcement} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none lowercase">
                        High-Performance<br />
                        <span className="text-primary">Gateway.</span>
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
                        The official portal for links, resources, and live event updates.
                        Providing direct authorization to the <strong>AI & Machine Learning Club</strong> activities and ecosystem.
                    </p>
                </motion.div>

                <EventBlade event={activeEvent} links={links} />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-20"
                >
                    {categories.map((cat) => {
                        const catLinks = groupedLinks[cat];
                        if (!catLinks || catLinks.length === 0 || cat === 'event') return null;

                        return (
                            <section key={cat} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">{cat}</h3>
                                    <div className="flex-1 h-px bg-border" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {catLinks.sort((a, b) => a.order - b.order).map((link) => (
                                        <motion.div key={link.$id} variants={itemVariants}>
                                            <LinkCard link={link} />
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </motion.div>

                {/* Resources Section */}
                {resources && resources.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-20 space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Governance Resources</h3>
                            <div className="flex-1 h-px bg-border" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map(res => (
                                <a
                                    key={res.$id}
                                    href={res.url || '#'}
                                    className="p-4 border border-border hover:border-primary/50 rounded flex items-center gap-4 group transition-all bg-card/50 hover:bg-card"
                                >
                                    <div className="p-3 bg-muted rounded text-muted-foreground group-hover:text-primary transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{res.title}</h4>
                                        <span className="text-[9px] uppercase tracking-widest font-black text-muted-foreground">{res.type} resource</span>
                                    </div>
                                    <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* System Status Footer */}
                <div className="mt-40 pt-16 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left opacity-60">
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] block mb-2 underline decoration-primary/30">Core Network</span>
                            <div className="flex items-center gap-2 justify-center md:justify-start font-mono">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
                                <span className="text-[10px] font-bold tracking-tight text-muted-foreground">SYSOPS: ONLINE</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] block mb-2">Protocol Build</span>
                            <span className="text-[10px] font-bold tracking-tight text-muted-foreground">V3.0-THEMED</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] block mb-2">Jurisdiction</span>
                            <span className="text-[10px] font-bold tracking-tight text-muted-foreground">OCT BPL CAMPUS</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

