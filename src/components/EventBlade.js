"use client";

import { Sparkles, Calendar, ArrowRight, MessageCircle } from "lucide-react";

export default function EventBlade({ event, links }) {
    if (!event) return null;

    const eventLinks = links.filter(l => l.event_id === event.$id);

    return (
        <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Live Activation
                </h3>
                <div className="flex-1 h-px bg-pink-500/20" />
            </div>

            <div className="bg-stone-900/40 border border-[#333] rounded-xl overflow-hidden">
                <div className="bg-stone-900 border-b border-[#333] px-6 py-4 flex justify-between items-center">
                    <div>
                        <h4 className="text-white font-bold text-lg">{event.title}</h4>
                        <p className="text-[10px] text-[#555] font-bold uppercase tracking-widest mt-0.5">Event Resources & Access</p>
                    </div>
                    <Calendar className="w-5 h-5 text-stone-700" />
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventLinks.map(link => (
                        <a
                            key={link.$id}
                            href={link.url}
                            target="_blank"
                            className="p-4 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between group hover:border-pink-500/30 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-pink-500/10 rounded">
                                    <MessageCircle className="w-4 h-4 text-pink-500" />
                                </div>
                                <span className="text-sm font-bold text-white uppercase tracking-tight">{link.title}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-700 group-hover:text-pink-500 transition-transform group-hover:translate-x-1" />
                        </a>
                    ))}
                    {eventLinks.length === 0 && (
                        <p className="text-xs text-[#555] italic">No specific uplinks for this activation yet.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
