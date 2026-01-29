import Link from "next/link";
import Image from "next/image";
import { getLinks, getAnnouncements } from "@/lib/server-appwrite";
import {
  Instagram,
  Linkedin,
  Github,
  MessageCircle,
  BookOpen,
  Mail,
  ExternalLink,
  ShieldCheck,
  Megaphone,
  Download
} from "lucide-react";
import "./app.css";

export const dynamic = 'force-dynamic';

const ICON_MAP = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  whatsapp: MessageCircle,
  blog: BookOpen,
  contact: Mail,
};

export default async function Home() {
  const links = await getLinks();
  const announcement = await getAnnouncements();

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center">
      {/* Background Decor */}
      <div className="cyber-grid absolute inset-0 z-0 pointer-events-none opacity-50" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-4xl px-6 pt-24 pb-32 flex flex-col items-center">

        {/* Header / Logos */}
        <div className="flex items-center gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="relative group">
            <div className="absolute -inset-2 bg-pink-500/20 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500" />
            <Image
              src="/aiml_club_logo.svg"
              alt="AIML Club Logo"
              width={80}
              height={80}
              className="relative rounded-full glass-card p-2"
            />
          </div>
          <div className="h-10 w-[1px] bg-stone-800" />
          <Image
            src="/college_logo.png"
            alt="OCT Logo"
            width={70}
            height={70}
            className="opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-gradient tracking-tight">
            Governance & <br /> Information
          </h1>
          <p className="text-stone-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Official digital ecosystem of the AI & Machine Learning Club, <br className="hidden md:block" />
            Oriental College of Technology, Bhopal.
          </p>
        </div>

        {/* Announcement Section */}
        {announcement && (
          <div className="w-full mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="glass-card p-4 rounded-2xl flex items-start gap-4 border-pink-500/20 bg-pink-500/5">
              <Megaphone className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 block mb-1">Latest Announcement</span>
                <p className="text-stone-200 text-sm leading-relaxed">
                  {announcement.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Connect Ecosystem Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {links.map((link) => {
            const Icon = ICON_MAP[link.key.toLowerCase()] || ExternalLink;
            return (
              <a
                key={link.$id}
                href={link.url}
                target={link.url.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="group glass-card p-5 rounded-2xl flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-900/50 border border-stone-800 flex items-center justify-center group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-colors">
                    <Icon className="w-5 h-5 text-stone-400 group-hover:text-pink-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-stone-200 font-semibold text-lg leading-tight group-hover:text-white">{link.title}</h3>
                    <span className="text-xs text-stone-500 font-medium tracking-wide uppercase">{link.category}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-700 group-hover:text-pink-500 transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Quick Access / Resources Row */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <Link href="/resources" className="glass-card p-4 rounded-xl text-center hover:bg-white/5 transition-colors">
            <Download className="w-5 h-5 mx-auto mb-2 text-stone-500" />
            <span className="text-xs font-semibold text-stone-300">Resources</span>
          </Link>
          <Link href="/constitution" className="glass-card p-4 rounded-xl text-center hover:bg-white/5 transition-colors">
            <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-stone-500" />
            <span className="text-xs font-semibold text-stone-300">Governance</span>
          </Link>
          {/* Restricted links will be visible but prompt login */}
          <div className="glass-card p-4 rounded-xl text-center opacity-50 cursor-not-allowed">
            <div className="w-5 h-5 mx-auto mb-2 bg-stone-800 rounded-full" />
            <span className="text-xs font-semibold text-stone-600">Events</span>
          </div>
          <div className="glass-card p-4 rounded-xl text-center opacity-50 cursor-not-allowed">
            <div className="w-5 h-5 mx-auto mb-2 bg-stone-800 rounded-full" />
            <span className="text-xs font-semibold text-stone-600">Internal</span>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="text-center space-y-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-800 bg-stone-900/30 text-xs font-bold text-stone-500 hover:text-pink-500 hover:border-pink-500/50 transition-all uppercase tracking-widest"
          >
            <ShieldCheck className="w-4 h-4" /> Admin Access
          </Link>
          <div className="pt-8">
            <p className="text-[10px] text-stone-600 uppercase tracking-[0.2em] font-medium leading-relaxed">
              &copy; AI & Machine Learning Club | OCT Bhopal <br />
              All rights reserved &copy; Umesh Patel
            </p>
            <a
              href="https://www.linkedin.com/in/umesh-patel-5647b42a4/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] text-pink-500/40 hover:text-pink-500 transition-colors uppercase tracking-widest font-bold mt-2 inline-block"
            >
              Developer Profile
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
