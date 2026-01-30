"use client";

import { MessageCircle, ShieldAlert, ArrowRight, Calendar, Sparkles } from "lucide-react";

export default function EventBlade({ event, links }) {
    if (!event) return null;

    const eventLinks = links.filter(l => l.event_id === event.$id);

    return (
        <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> High-Priority Protocol
                </h3>
                <div className="flex-1 h-px bg-border" />
            </div>

            <div className="bg-card border border-primary/20 rounded-2xl overflow-hidden">
                <div className="bg-muted/10 border-b border-border px-6 py-6 flex justify-between items-center">
                    <div className="space-y-1">
                        <h4 className="text-foreground font-black text-xl tracking-tight leading-none uppercase">{event.title}</h4>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Active Live Activation</p>
                        </div>
                    </div>
                    <div className="p-3 bg-card border border-border rounded-xl">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventLinks.map(link => (
                        <a
                            key={link.$id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-5 bg-muted/30 border border-border rounded-xl flex items-center justify-between group active:scale-[0.98] active:bg-muted/50 transition-all border-l-4 border-l-primary/30"
                            aria-label={`Secure Uplink: ${link.title}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-card rounded-lg border border-border group-hover:border-primary/20 transition-all">
                                    <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-foreground block leading-none">{link.title}</span>
                                    <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mt-1 block">Verified Channel</span>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1" />
                        </a>
                    ))}
                    {eventLinks.length === 0 && (
                        <div className="col-span-full py-12 text-center border border-dashed border-border rounded-2xl bg-muted/5">
                            <ShieldAlert className="w-6 h-6 text-muted-foreground mx-auto mb-3" />
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Atmospheric Encryption Active: No event links found</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
