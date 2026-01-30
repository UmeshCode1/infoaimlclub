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

                    <footer className="w-full border-t border-[#333333] py-12 px-6 bg-black">
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-col items-center md:items-start">
                                <p className="text-[#888888] text-sm">
                                    © {new Date().getFullYear()} All rights reserved. Registered for AIML Club.
                                </p>
                                <p className="text-white text-sm font-medium mt-1">
                                    All rights reserved © Umesh Patel
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                <a
                                    href="https://www.linkedin.com/in/umesh-patel-5647b42a4/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-[#888888] hover:text-white transition-colors uppercase tracking-widest font-bold"
                                >
                                    LinkedIn Profile
                                </a>
                                <span className="text-[#333333]">|</span>
                                <a
                                    href="/admin"
                                    className="text-xs text-[#888888] hover:text-white transition-colors uppercase tracking-widest font-bold"
                                >
                                    Admin Portal
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
