"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Overview", id: "overview" },
    { label: "Noise Cancelling", id: "noise-cancelling" },
    { label: "Technology", id: "technology" },
    { label: "Features", id: "features" },
    { label: "Buy", id: "buy" }
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -60% 0px" } // Adjust to trigger when section is in middle of viewport
        );

        NAV_ITEMS.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 transition-colors duration-500",
                isScrolled
                    ? "bg-[#050505]/75 backdrop-blur-md border-b border-white/5"
                    : "bg-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="flex-1 flex items-center justify-start">
                <span className="text-white/90 font-medium tracking-tight text-sm">
                    ProDepth
                </span>
            </div>

            <div className="hidden md:flex flex-1 items-center justify-center gap-8">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={cn(
                            "transition-colors text-xs font-medium tracking-wide",
                            activeSection === item.id
                                ? "text-white"
                                : "text-white/60 hover:text-white/90"
                        )}
                    >
                        {item.label}
                    </a>
                ))}
            </div>

            <div className="flex-1 flex items-center justify-end">
                <a
                    href="#buy"
                    onClick={(e) => scrollToSection(e, "buy")}
                    className="relative group px-4 py-1.5 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
                >
                    <span className="absolute inset-0 bg-sony-blue/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute inset-0 rounded-full border border-sony-cyan/30 group-hover:border-sony-cyan/70 transition-colors duration-300"></span>
                    <span className="relative text-xs font-semibold text-white group-hover:drop-shadow-[0_0_8px_rgba(0,214,255,0.8)] transition-all duration-300">
                        Experience ProDepth
                    </span>
                </a>
            </div>
        </motion.nav>
    );
}
