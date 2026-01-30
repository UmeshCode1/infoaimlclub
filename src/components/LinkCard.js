"use client";

import { MessageCircle, Globe, ExternalLink, ArrowRight } from "lucide-react";

const ICON_MAP = {
    instagram: Globe,
    linkedin: Globe,
    github: Globe,
    whatsapp: MessageCircle,
};

export default function LinkCard({ link }) {
    // We use a deterministic approach for icons to keep it low-thermal
    const Icon = ICON_MAP[link.icon_key] || Globe;

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="subtle-card p-4 flex items-center justify-between group border-[#222] bg-stone-900/20"
            aria-label={`Open ${link.title}`}
        >
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-[#1a1a1a] rounded group-hover:bg-[#ec489908] transition-colors border border-transparent group-hover:border-[#ec489920]">
                    <Icon className="w-5 h-5 text-[#555] group-hover:text-pink-500 transition-colors" />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-[#ededed] group-hover:text-white transition-colors uppercase tracking-tight">
                        {link.title}
                    </h4>
                    <span className="text-[9px] text-[#444] uppercase tracking-widest font-black group-hover:text-pink-900 transition-colors">
                        Authorized Link
                    </span>
                </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#222] group-hover:text-white transition-all opacity-0 group-hover:opacity-100" />
        </a>
    );
}
