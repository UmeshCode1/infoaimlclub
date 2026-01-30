import './globals.css';
import AppwritePing from '@/components/AppwritePing';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
    title: 'AI & Machine Learning Club – OCT | Information & Access Gateway',
    description: 'Official platform for verified links, resources, announcements, and community access of the AIML Club, Oriental College of Technology.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="bg-background text-foreground antialiased transition-colors duration-300">
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

                    <footer className="w-full border-t border-border py-16 px-6 bg-card text-card-foreground mt-auto">
                        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
                            <div className="space-y-4">
                                <p className="text-sm font-bold text-foreground">
                                    All rights reserved © Umesh Patel<br />
                                    LinkedIn: <a href="https://www.linkedin.com/in/umesh-patel-5647b42a4/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">https://www.linkedin.com/in/umesh-patel-5647b42a4/</a>
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-base font-black tracking-tight uppercase">
                                    AI & Machine Learning Club
                                </p>
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                                    Oriental College of Technology, Bhopal
                                </p>
                            </div>
                        </div>
                    </footer>
                </ThemeProvider>
            </body>
        </html>
    );
}
