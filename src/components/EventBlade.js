"use client";

import { MessageCircle, ShieldAlert, ArrowRight, Calendar, Sparkles } from "lucide-react";

export default function EventBlade({ event, links }) {
    if (!event) return null;

    const eventLinks = links.filter(l => l.event_id === event.$id);

    return (
        <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 fill-pink-500/20" /> Active Activation
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-pink-500/20 to-transparent" />
            </div>

            <div className="group relative bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-[0_0_40px_-15px_rgba(236,72,153,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                <div className="relative bg-background/40 backdrop-blur-sm border-b border-border px-8 py-5 flex justify-between items-center">
                    <div>
                        <h4 className="text-foreground font-black text-xl tracking-tight">{event.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <p className="text-[10px] text-primary/80 font-bold uppercase tracking-widest">Priority Command Access</p>
                        </div>
                    </div>
                    <Calendar className="w-6 h-6 text-muted-foreground" />
                </div>

                <div className="relative p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {eventLinks.map(link => (
                        <a
                            key={link.$id}
                            href={link.url}
                            target="_blank"
                            className="p-5 bg-muted/40 border border-border rounded-xl flex items-center justify-between group/link hover:border-primary/40 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-background rounded-lg border border-border group-hover/link:border-primary/20 transition-all">
                                    <MessageCircle className="w-5 h-5 text-muted-foreground group-hover/link:text-primary" />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-foreground/80 group-hover/link:text-foreground uppercase tracking-tight block">{link.title}</span>
                                    <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Secure Uplink</span>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover/link:text-primary transition-transform group-hover/link:translate-x-1" />
                        </a>
                    ))}
                    {eventLinks.length === 0 && (
                        <div className="col-span-full py-8 text-center border border-dashed border-border rounded-xl bg-muted/10">
                            <ShieldAlert className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest italic">Encrypted event matrix empty.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
