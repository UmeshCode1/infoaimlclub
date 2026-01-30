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

            <div className="group relative bg-[#0a0a0a] border border-pink-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_-15px_rgba(236,72,153,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none" />

                <div className="relative bg-black/40 backdrop-blur-sm border-b border-[#222] px-8 py-5 flex justify-between items-center">
                    <div>
                        <h4 className="text-white font-black text-xl tracking-tight">{event.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                            <p className="text-[10px] text-pink-500/80 font-bold uppercase tracking-widest">Priority Command Access</p>
                        </div>
                    </div>
                    <Calendar className="w-6 h-6 text-stone-800" />
                </div>

                <div className="relative p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {eventLinks.map(link => (
                        <a
                            key={link.$id}
                            href={link.url}
                            target="_blank"
                            className="p-5 bg-stone-900/40 border border-[#222] rounded-xl flex items-center justify-between group/link hover:border-pink-500/40 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-black rounded-lg border border-[#212121] group-hover/link:border-pink-500/20 transition-all">
                                    <MessageCircle className="w-5 h-5 text-stone-600 group-hover/link:text-pink-500" />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-stone-300 group-hover/link:text-white uppercase tracking-tight block">{link.title}</span>
                                    <span className="text-[9px] text-stone-600 uppercase font-black tracking-widest">Secure Uplink</span>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-800 group-hover/link:text-pink-500 transition-transform group-hover/link:translate-x-1" />
                        </a>
                    ))}
                    {eventLinks.length === 0 && (
                        <div className="col-span-full py-8 text-center border border-dashed border-[#222] rounded-xl bg-stone-900/10">
                            <ShieldAlert className="w-6 h-6 text-stone-800 mx-auto mb-2" />
                            <p className="text-xs text-stone-600 font-bold uppercase tracking-widest italic">Encrypted event matrix empty.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
