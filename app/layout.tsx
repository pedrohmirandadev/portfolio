import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex", display: "swap" });

export const metadata: Metadata = {
  description: "Java and full-stack engineer turning complex enterprise systems into thoughtful, resilient software. Based in São Paulo, Brazil.",
  openGraph: {
    title: "Pedro Oliveira — Order from complexity",
    description: "Backend depth. Full-stack perspective. Real-world outcomes.",
    type: "website", locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script id="theme-initializer" dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){}` }} /></head><body className={`${sans.variable} ${mono.variable}`}><noscript><style>{`.site [style] { opacity: 1 !important; transform: none !important; }`}</style></noscript>{children}</body></html>;
}
