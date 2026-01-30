import AppwritePing from "@/components/AppwritePing";
import "./globals.css";

export const metadata = {
    title: "info.aimlclub.tech | Governance & Information Hub",
    description: "Official digital information & governance platform of AI & Machine Learning Club – Oriental College of Technology",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/aiml_club_logo.png" />
            </head>
            <body>
                <div className="flex flex-col min-h-screen">
                    <AppwritePing />
                    <div className="flex-grow">
                        {children}
                    </div>

                    <footer className="w-full border-t border-[#1a1a1a] py-20 px-6 bg-black">
                        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
                            <div className="flex flex-col items-center">
                                <p className="text-[#333] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                                    Official Infrastructure Registry
                                </p>
                                <p className="text-white text-xs font-bold mt-1 uppercase tracking-tight">
                                    All rights reserved © Umesh Patel
                                </p>
                                <p className="text-[#555] text-[10px] mt-2 font-medium">
                                    AI & Machine Learning Club | Oriental College of Technology
                                </p>
                            </div>

                            <div className="flex items-center gap-8">
                                <a
                                    href="https://www.linkedin.com/in/umesh-patel-5647b42a4/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-[#444] hover:text-white transition-all uppercase tracking-[0.2em] font-black border-b border-[#1a1a1a] hover:border-pink-500 pb-1"
                                >
                                    Network Profile
                                </a>
                                <div className="w-1 h-1 rounded-full bg-stone-800" />
                                <a
                                    href="/admin"
                                    className="text-[10px] text-[#444] hover:text-white transition-all uppercase tracking-[0.2em] font-black border-b border-[#1a1a1a] hover:border-pink-500 pb-1"
                                >
                                    Governance Access
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
