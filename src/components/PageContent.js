"use client";

import Link from "next/link";
import AnnouncementBanner from "./AnnouncementBanner";
import EventBlade from "./EventBlade";
import LinkCard from "./LinkCard";
import { Globe, FileText, Download, ExternalLink } from "lucide-react";

export default function PageContent({ links, announcement, activeEvent, resources }) {
    const groupedLinks = links.reduce((acc, link) => {
        if (!acc[link.category]) acc[link.category] = [];
        acc[link.category].push(link);
        return acc;
    }, {});

    const categories = ["core", "community", "event", "resources", "subbrand"];

    return (
        <div className="w-full flex flex-col min-h-screen">
            {/* Header - Refactored for Precision */}
            <header className="nav-blur">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img src="/college_logo.png" alt="OCT" className="h-7 w-auto md:h-8" />
                            <div className="w-px h-5 bg-[#333] hidden md:block" />
                            <img src="/aiml_club_logo.png" alt="AIML Club" className="h-7 w-auto md:h-8" />
                        </div>
                        <div className="hidden sm:block text-left">
                            <h1 className="text-xs font-black tracking-tight text-white uppercase">Governance Platform</h1>
                            <p className="text-[10px] text-[#555] font-bold">BY AIML CLUB @ OCT</p>
                        </div>
                    </div>
                    <Link href="/admin" className="text-[10px] font-black text-[#555] hover:text-white transition-all uppercase tracking-[0.2em] border border-[#333] px-3 py-1.5 rounded bg-black">
                        Portal Access
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pt-12 pb-32 flex-grow">
                <AnnouncementBanner announcement={announcement} />

                <div className="mb-20">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 leading-none lowercase">
                        Connect<br />
                        <span className="text-pink-600">Ecosystem.</span>
                    </h2>
                    <p className="text-[#888] text-base md:text-lg max-w-xl leading-relaxed">
                        The high-performance gateway for official links & resources.
                        Providing direct authorization to the AIML Club digital matrix.
                    </p>
                </div>

                <EventBlade event={activeEvent} links={links} />

                <div className="space-y-20">
                    {categories.map((cat) => {
                        const catLinks = groupedLinks[cat];
                        if (!catLinks || catLinks.length === 0 || cat === 'event') return null;

                        return (
                            <section key={cat} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#444]">{cat}</h3>
                                    <div className="flex-1 h-px bg-[#222]" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {catLinks.sort((a, b) => a.order - b.order).map((link) => (
                                        <LinkCard key={link.$id} link={link} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Resources Section Refactored */}
                {resources && resources.length > 0 && (
                    <section className="mt-20 space-y-8">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#444]">Governance Resources</h3>
                            <div className="flex-1 h-px bg-[#222]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map(res => (
                                <a
                                    key={res.$id}
                                    href={res.url || '#'}
                                    className="p-4 border border-[#222] hover:border-[#444] rounded flex items-center gap-4 group transition-all"
                                >
                                    <div className="p-3 bg-stone-900 rounded text-stone-600 group-hover:text-white transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-stone-200 group-hover:text-white">{res.title}</h4>
                                        <span className="text-[9px] uppercase tracking-widest font-black text-stone-600">{res.type} resource</span>
                                    </div>
                                    <Download className="w-4 h-4 text-stone-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                {/* System Status Footer */}
                <div className="mt-40 pt-16 border-t border-[#1a1a1a]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left opacity-30">
                        <div>
                            <span className="text-[10px] font-black text-[#444] uppercase tracking-[0.2em] block mb-2">Core Network</span>
                            <span className="text-[10px] font-bold tracking-tight text-[#888]">SYSOPS: ONLINE</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-[#444] uppercase tracking-[0.2em] block mb-2">Protocol Build</span>
                            <span className="text-[10px] font-bold tracking-tight text-[#888]">V2.5-STABLE</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-[#444] uppercase tracking-[0.2em] block mb-2">Jurisdiction</span>
                            <span className="text-[10px] font-bold tracking-tight text-[#888]">OCT BPL CAMPUS</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
