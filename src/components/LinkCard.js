"use client";

import { MessageCircle, Globe, ArrowRight, Instagram, Linkedin, Github } from "lucide-react";

const ICON_MAP = {
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
    whatsapp: MessageCircle,
};

export default function LinkCard({ link }) {
    const Icon = ICON_MAP[link.key.toLowerCase()] || Globe;

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 bg-card border border-border rounded-2xl group transition-all duration-200 active:scale-[0.98] active:bg-muted/50"
            aria-label={`Official access: ${link.title}`}
        >
            <div className="flex items-center gap-5">
                <div className="p-3 bg-muted rounded-xl border border-border group-hover:border-primary/20 transition-all">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-sm font-black text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">
                        {link.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold group-hover:text-foreground/70 transition-colors">
                        Authorized {link.category} link
                    </span>
                </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
        </a>
    );
}
