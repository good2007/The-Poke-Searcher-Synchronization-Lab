import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Poké-Searcher Dashboard",
  description: "Search and view Pokémon details in real time using the PokéAPI.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <header className="flex justify-center border-b border-slate-200 bg-white/95 px-6 py-4 shadow-sm backdrop-blur-sm">
          <div className="max-w-6xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Poké-Searcher Synchronization Lab
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Fast, clean Pokémon search experience powered by the PokéAPI.
            </p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
