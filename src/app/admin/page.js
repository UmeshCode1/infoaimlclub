"use client";

import { useState, useEffect } from "react";
import { account, databases } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import {
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
    Shield,
    Globe,
    CheckCircle2,
    Clock,
    UserCircle
} from "lucide-react";

const COLLECTIONS = {
    members: 'members',
    links: 'community_links',
    events: 'events',
    announcements: 'announcements',
    resources: 'resources'
};

const CATEGORIES = ["core", "community", "event", "resources", "subbrand"];
const TEAMS = ['AIML_ADMIN', 'AIML_FACULTY', 'AIML_CORE', 'AIML_EVENTS', 'AIML_TECH', 'AIML_DISCIPLINE', 'AIML_MEDIA', 'AIML_ANCHORS'];

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('links');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({});
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
            const response = await databases.listDocuments('main', COLLECTIONS[tab]);
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
        if (!confirm("Safety Protocol: Are you sure? Deletion is permanent.")) return;
        try {
            await databases.deleteDocument('main', COLLECTIONS[activeTab], id);
            setData(prev => prev.filter(item => item.$id !== id));
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await databases.createDocument('main', COLLECTIONS[activeTab], 'unique()', formData);
            setData([res, ...data]);
            setShowAddForm(false);
            setFormData({});
        } catch (error) {
            alert(error.message);
        }
    };

    const NavItem = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => { setActiveTab(id); setSidebarOpen(false); setShowAddForm(false); }}
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
        <div className="min-h-screen bg-[#000000] flex flex-col md:flex-row text-[#ededed]">
            {/* Mobile Nav Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-black">
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-pink-500" />
                    <span className="font-bold text-sm tracking-tight text-white uppercase">Governance Console</span>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-stone-400">
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
                w-64 bg-black border-r border-[#222] flex flex-col
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 hidden md:flex items-center gap-3 mb-6">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                        <Shield className="w-5 h-5 text-pink-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-[10px] tracking-[0.2em] text-white uppercase">Control Matrix</span>
                        <span className="text-[8px] text-stone-600 font-bold uppercase tracking-widest">SOP: APPROVED</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <NavItem id="members" label="Council Members" icon={Users} />
                    <NavItem id="links" label="Ecosystem Links" icon={LinkIcon} />
                    <NavItem id="events" label="Live Activations" icon={Calendar} />
                    <NavItem id="announcements" label="Protocols" icon={Megaphone} />
                    <NavItem id="resources" label="Institutional Files" icon={Download} />
                </nav>

                <div className="p-4 border-t border-[#222]">
                    {user && (
                        <div className="px-4 py-3 mb-4 rounded-lg bg-stone-900/50 flex items-center gap-3">
                            <UserCircle className="w-8 h-8 text-stone-700" />
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-[10px] text-white font-bold truncate">{user.email}</span>
                                <span className="text-[8px] text-pink-500 font-black uppercase tracking-widest">Authorized</span>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-4 h-4" />
                        Terminate
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen bg-[#050505]">
                <header className="px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Governance System</span>
                            <div className="w-1 h-1 rounded-full bg-stone-600" />
                            <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{activeTab}</span>
                        </div>
                        <h1 className="text-3xl font-black text-white capitalize tracking-tight flex items-center gap-4">
                            Manage {activeTab}
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-white text-black py-3 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-pink-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
                    >
                        {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {showAddForm ? "Cancel Entry" : "New Record"}
                    </button>
                </header>

                <div className="px-8 pb-32 flex-grow">
                    {showAddForm && (
                        <div className="mb-10 p-8 border border-pink-500/20 bg-pink-500/[0.02] rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {activeTab === 'members' && (
                                    <>
                                        <input type="text" placeholder="Full Name" required onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm md:col-span-2" />

                                        <input type="text" placeholder="Enrollment No. (Optional)" onChange={e => setFormData({ ...formData, enrollment_no: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm" />
                                        <input type="text" placeholder="Contact No. (Optional)" onChange={e => setFormData({ ...formData, contact: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm" />

                                        <input type="email" placeholder="Email Address" required onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm" />
                                        <input type="text" placeholder="Official Role" required onChange={e => setFormData({ ...formData, role: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm" />
                                        <select required onChange={e => setFormData({ ...formData, team: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm capitalize md:col-span-2">
                                            <option value="">Select Team</option>
                                            {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </>
                                )}
                                {activeTab === 'links' && (
                                    <>
                                        <input type="text" placeholder="Slug (e.g., instagram)" required onChange={e => setFormData({ ...formData, key: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm" />
                                        <input type="text" placeholder="Display Title" required onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm" />
                                        <input type="url" placeholder="Destination URL" required onChange={e => setFormData({ ...formData, url: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm" />
                                        <select required onChange={e => setFormData({ ...formData, category: e.target.value })} className="bg-black border border-[#222] p-4 rounded-xl text-sm capitalize">
                                            <option value="">Select Category</option>
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </>
                                )}
                                <div className="md:col-span-2">
                                    <button type="submit" className="w-full py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-pink-500 hover:text-white transition-all">Submit Protocol Entry</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-stone-900/10 border border-[#222] rounded-2xl overflow-hidden backdrop-blur-sm">
                        {loading ? (
                            <div className="h-64 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="w-10 h-10 animate-spin text-stone-700" />
                                <span className="text-[10px] font-black text-stone-700 uppercase tracking-widest">Polling Database...</span>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#222] bg-white/[0.01]">
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-stone-600">Identity / Name</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-stone-600">Context</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-stone-600">Connectivity</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-stone-600 text-right">Ops</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#222]">
                                        {data.map((item) => (
                                            <tr key={item.$id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-stone-900 border border-[#222] flex items-center justify-center group-hover:border-pink-500/20 transition-all">
                                                            <span className="text-xs font-black text-stone-600 group-hover:text-pink-500 uppercase">{(item.name || item.title || "U").charAt(0)}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-white font-bold text-sm tracking-tight">{item.name || item.title || item.message.slice(0, 40)}</span>
                                                            <span className="text-stone-600 text-[9px] font-black uppercase tracking-widest mt-0.5">ID: {item.$id.slice(-8).toUpperCase()}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {activeTab === 'members' && (
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-stone-400 font-bold">{item.role}</span>
                                                            <span className="text-[9px] text-pink-500 font-black uppercase tracking-widest mt-0.5">{item.team}</span>
                                                        </div>
                                                    )}
                                                    {activeTab === 'links' && (
                                                        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-stone-900 border border-[#333] rounded text-stone-500">
                                                            {item.category}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`} />
                                                        <span className="text-[10px] font-black text-stone-500 uppercase tracking-tighter">{item.active ? 'Operational' : 'Deactivated'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button
                                                        onClick={() => handleDelete(item.$id)}
                                                        className="p-3 text-stone-700 hover:text-red-500 transition-all hover:bg-red-500/5 rounded-lg border border-transparent hover:border-red-500/10"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {data.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-8 py-20 text-center">
                                                    <div className="max-w-xs mx-auto text-stone-700">
                                                        <Globe className="w-12 h-12 mx-auto mb-4 opacity-10" />
                                                        <p className="text-xs font-black uppercase tracking-widest mb-2">Zero Data Found</p>
                                                        <p className="text-[10px] font-bold">The current matrix segment contains no operational records.</p>
                                                    </div>
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
