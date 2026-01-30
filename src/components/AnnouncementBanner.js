"use client";

import { Megaphone } from "lucide-react";

export default function AnnouncementBanner({ announcement }) {
    if (!announcement) return null;

    return (
        <div className="mb-12">
            <div className="bg-[#ec489908] border border-[#ec489920] rounded-lg p-5 flex items-start gap-4 shadow-sm">
                <div className="shrink-0 p-2 bg-[#ec489915] rounded text-pink-500">
                    <Megaphone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Notice Protocol</span>
                        <span className="text-[10px] text-[#333] font-mono">STDOUT:LATEST</span>
                    </div>
                    <p className="text-sm text-[#ededed] font-medium leading-relaxed">
                        {announcement.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
