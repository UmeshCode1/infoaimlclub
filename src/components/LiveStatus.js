"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, Wind, Zap } from "lucide-react";

export default function LiveStatus() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-6 py-4 px-6 bg-card/30 border border-border rounded-2xl backdrop-blur-sm mb-12">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">System Time</span>
                    <span className="text-sm font-mono font-bold text-foreground">{formatTime(time)}</span>
                </div>
            </div>

            <div className="h-8 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                    <MapPin className="w-4 h-4 text-green-500" />
                </div>
                <div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">Deployment Node</span>
                    <span className="text-sm font-bold text-foreground">OCT BHOPAL</span>
                </div>
            </div>

            <div className="h-8 w-px bg-border hidden md:block" />

            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Wind className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">Atmospheric Code</span>
                    <span className="text-sm font-bold text-foreground uppercase">Stable [V4]</span>
                </div>
            </div>

            <div className="ml-auto hidden lg:flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20" />
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">Quantum Link Established</span>
            </div>
        </div>
    );
}
