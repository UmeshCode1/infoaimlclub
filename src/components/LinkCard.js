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
            className="flex items-center justify-between p-4 bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 rounded-lg group transition-all duration-300"
            aria-label={`Open ${link.title}`}
        >
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-muted rounded border border-border group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">
                        {link.title}
                    </h4>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black group-hover:text-primary/70 transition-colors">
                        {link.category} protocol active
                    </span>
                </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </a>
    );
}
