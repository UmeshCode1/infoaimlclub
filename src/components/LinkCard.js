"use client";

import { MessageCircle, Globe, ExternalLink, ArrowRight, Instagram, Linkedin, Github } from "lucide-react";

const ICON_MAP = {
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
    whatsapp: MessageCircle,
};

export default function LinkCard({ link }) {
    // Use semantic icons based on key or category
    const Icon = ICON_MAP[link.key.toLowerCase()] || Globe;

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-stone-900/40 border border-[#222] hover:border-pink-500/30 rounded-lg group transition-all duration-300"
            aria-label={`Open ${link.title}`}
        >
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-[#111] rounded border border-[#222] group-hover:border-pink-500/20 group-hover:bg-pink-500/5 transition-all">
                    <Icon className="w-5 h-5 text-stone-500 group-hover:text-pink-500 transition-colors" />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-stone-200 group-hover:text-white transition-colors uppercase tracking-tight">
                        {link.title}
                    </h4>
                    <span className="text-[9px] text-[#444] uppercase tracking-widest font-black group-hover:text-pink-900 transition-colors">
                        {link.category} protocol active
                    </span>
                </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#222] group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
        </a>
    );
}
