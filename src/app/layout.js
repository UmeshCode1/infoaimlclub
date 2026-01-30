import { Inter } from 'next/font/google';
import './globals.css';
import AppwritePing from '@/components/AppwritePing';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'AI & Machine Learning Club | OCT',
    description: 'The Official Governance Platform of the AIML Club at Oriental College of Technology.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={`${inter.className} bg-background text-foreground antialiased transition-colors duration-300`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <AppwritePing />
                    <div className="relative z-10 min-h-screen flex flex-col">
                        {children}
                    </div>

                    <footer className="w-full border-t border-border py-12 px-6 bg-card text-card-foreground mt-auto">
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                    System Architecture
                                </p>
                                <p className="text-sm font-bold">
                                    All rights reserved © Umesh Patel
                                </p>
                            </div>

                            <a
                                href="https://www.linkedin.com/in/umesh-patel-5647b42a4/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-bold flex items-center gap-2"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
                                LinkedIn Profile
                            </a>
                        </div>
                    </footer>
                </ThemeProvider>
            </body>
        </html>
    );
}
