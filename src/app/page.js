import Link from "next/link";
import "./app.css";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl border border-stone-800 bg-stone-900/50 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">System Online</h1>
        <p className="text-stone-400 mb-8">
          The Info & Governance Platform is currently being initialized.
          <br />
          Please check back in a few minutes.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/admin"
            className="px-6 py-2 rounded-full bg-pink-600 text-white font-bold hover:bg-pink-500 transition-colors"
          >
            Admin Login
          </Link>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-800/50">
          <p className="text-[10px] text-stone-600 uppercase tracking-widest">
            System Status: <span className="text-green-500">Active</span>
          </p>
        </div>
      </div>
    </div>
  );
}
