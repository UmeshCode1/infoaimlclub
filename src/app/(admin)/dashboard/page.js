"use client";

import { useState, useEffect } from "react";
import { account, databases } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Link as LinkIcon,
    Calendar,
    Download,
    Megaphone,
    LogOut,
    Plus,
    Trash2,
    Loader2,
    Menu,
    X,
    Shield
} from "lucide-react";

const COLLECTIONS = {
    members: 'members',
    links: 'community_links',
    events: 'events',
    announcements: 'announcements',
    resources: 'resources'
};

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('links');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const session = await account.get();
                setUser(session);
                fetchData(activeTab);
            } catch (error) {
                router.replace('/admin/login');
            }
        };
        checkUser();
    }, [activeTab]);

    const fetchData = async (tab) => {
        setLoading(true);
        try {
            const response = await databases.listDocuments(
                'main',
                COLLECTIONS[tab]
            );
            setData(response.documents);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await account.deleteSession('current');
        router.push('/admin/login');
    };

    const handleDelete = async (id) => {
        if (!confirm("Safety Protocol: Are you sure you want to permanently delete this record? This action cannot be reversed.")) return;
        try {
            await databases.deleteDocument('main', COLLECTIONS[activeTab], id);
            setData(prev => prev.filter(item => item.$id !== id));
        } catch (error) {
            alert(error.message);
        }
    };

    const NavItem = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === id
                    ? 'bg-white/10 text-white'
                    : 'text-stone-500 hover:text-stone-300 hover:bg-white/[0.02]'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row font-sans">
            {/* Mobile Nav Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-black">
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-pink-500" />
                    <span className="font-bold text-sm tracking-tight text-white uppercase">Admin Hub</span>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-stone-400">
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
                w-64 bg-black border-r border-white/5 flex flex-col
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 hidden md:flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-pink-500" />
                    <span className="font-bold text-sm tracking-tight text-white uppercase">Operational Console</span>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <NavItem id="members" label="Members" icon={Users} />
                    <NavItem id="links" label="Links" icon={LinkIcon} />
                    <NavItem id="events" label="Events" icon={Calendar} />
                    <NavItem id="resources" label="Resources" icon={Download} />
                    <NavItem id="announcements" label="Announce" icon={Megaphone} />
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Terminate Session
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen">
                <header className="p-8 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white capitalize">{activeTab}</h1>
                        <p className="text-stone-500 text-sm mt-1">Status: Authorized Connection Active</p>
                    </div>
                    <button className="btn-primary py-2 px-6 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add New
                    </button>
                </header>

                <div className="p-8 pt-4 flex-1">
                    <div className="glass-card overflow-hidden border border-white/5 bg-white/[0.01]">
                        {loading ? (
                            <div className="h-64 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-stone-600" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/[0.02]">
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-500">Record Details</th>
                                            {activeTab === 'members' && <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-500">Role/Team</th>}
                                            {activeTab === 'links' && <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-500">Category</th>}
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-500 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {data.map((item) => (
                                            <tr key={item.$id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-medium text-sm">{item.name || item.title || item.message.slice(0, 30)}</span>
                                                        <span className="text-stone-500 text-[10px] font-mono mt-0.5 uppercase tracking-tighter">UID: {item.$id.slice(-6).toUpperCase()}</span>
                                                    </div>
                                                </td>
                                                {activeTab === 'members' && (
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-stone-300 font-bold">{item.role}</span>
                                                            <span className="text-[10px] text-pink-500 font-black uppercase tracking-widest">{item.team}</span>
                                                        </div>
                                                    </td>
                                                )}
                                                {activeTab === 'links' && (
                                                    <td className="px-6 py-4">
                                                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-stone-900 border border-white/10 rounded text-stone-400">
                                                            {item.category}
                                                        </span>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(item.$id)}
                                                        className="p-2 text-stone-600 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {data.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center text-stone-500 italic text-sm">
                                                    No operational records found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
