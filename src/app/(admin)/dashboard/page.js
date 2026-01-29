"use client";

import { useState, useEffect } from "react";
import { client, account, databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Link as LinkIcon,
    Megaphone,
    LogOut,
    Plus,
    Trash2,
    Eye,
    ShieldCheck,
    Search
} from "lucide-react";
import Image from 'next/image';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("members");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const DB = "main";
    const COLLECTIONS = {
        members: "members",
        links: "community_links",
        announcements: "announcements"
    };

    useEffect(() => {
        const init = async () => {
            try {
                const u = await account.get();
                setUser(u);
                fetchData(activeTab);
            } catch {
                router.push("/admin/login");
            }
        };
        init();
    }, [activeTab, router]);

    const fetchData = async (tab) => {
        setLoading(true);
        try {
            const response = await databases.listDocuments(
                DB,
                COLLECTIONS[tab],
                [Query.limit(100), Query.orderDesc("$createdAt")]
            );
            setData(response.documents);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await account.deleteSession("current");
        router.push("/admin/login");
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure? This cannot be undone.")) return;
        try {
            await databases.deleteDocument(DB, COLLECTIONS[activeTab], id);
            setData(prev => prev.filter(d => d.$id !== id));
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-stone-950 border-r border-stone-800 p-6 flex flex-col hidden md:flex fixed h-full">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                        <ShieldCheck className="w-5 h-5 text-pink-500" />
                    </div>
                    <span className="font-bold tracking-tight text-white">Admin Console</span>
                </div>

                <nav className="space-y-1 flex-1">
                    <NavBtn label="Members" icon={Users} active={activeTab === "members"} onClick={() => setActiveTab("members")} />
                    <NavBtn label="Links" icon={LinkIcon} active={activeTab === "links"} onClick={() => setActiveTab("links")} />
                    <NavBtn label="Announcements" icon={Megaphone} active={activeTab === "announcements"} onClick={() => setActiveTab("announcements")} />
                </nav>

                <div className="pt-6 border-t border-stone-800">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-400">
                            {user?.name?.[0] || "A"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                            <p className="text-xs text-stone-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white capitalize">{activeTab} Management</h1>
                        <p className="text-stone-500 text-sm">Manage your platform content securely.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-pink-500/20">
                        <Plus className="w-4 h-4" /> Create New
                    </button>
                </header>

                <div className="glass-card border border-stone-800 rounded-xl overflow-hidden bg-stone-900/30">
                    {loading ? (
                        <div className="p-12 text-center text-stone-500">Loading data...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-stone-900/50 text-xs uppercase text-stone-500 border-b border-stone-800">
                                    <tr>
                                        <th className="px-6 py-4 font-bold tracking-wider">Name / Title</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">Detail / Role</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                                        <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-800 text-sm">
                                    {data.map((item) => (
                                        <tr key={item.$id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">
                                                {item.name || item.title || item.message?.substring(0, 30)}
                                            </td>
                                            <td className="px-6 py-4 text-stone-400">
                                                {item.role || item.url || item.starts_at}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.active !== undefined ? (
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${item.active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                        {item.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                ) : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button onClick={() => handleDelete(item.$id)} className="p-2 hover:bg-red-500/20 text-stone-500 hover:text-red-400 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {data.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-12 text-center text-stone-500">
                                                No records found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function NavBtn({ label, icon: Icon, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active
                    ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-white'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
}
