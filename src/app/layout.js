import AppwritePing from "@/components/AppwritePing";
import "./globals.css";

export const metadata = {
    title: "info.aimlclub.tech | Governance Platform",
    description: "Official digital information & governance platform of AI & Machine Learning Club – Oriental College of Technology",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/aiml_club_logo.svg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-[#050505] font-sans text-stone-300 selection:bg-pink-500/30 selection:text-pink-200 antialiased">
                <AppwritePing />
                {children}
            </body>
        </html>
    );
}
