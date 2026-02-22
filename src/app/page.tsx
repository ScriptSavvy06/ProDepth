"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import CanvasSequence from "@/components/CanvasSequence";

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hero Intro
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

  // Sound Quality (Mid animation)
  const soundOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]);
  const soundY = useTransform(scrollYProgress, [0.35, 0.45], [50, 0]);

  // Reassembly & CTA
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.8, 0.9, 1], [50, 0, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh]" id="overview">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-sony-blue/5 rounded-full blur-[100px]" />
        </div>

        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none mix-blend-screen">
          <CanvasSequence progress={scrollYProgress} folderPath="/sequence" frameCount={240} />
        </div>

        <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
          {/* HERO TEXT */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 drop-shadow-2xl">
              Sony WH-1000XM6
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white/90 via-white/70 to-sony-cyan/80 mt-2">
              Silence, perfected.
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto text-base md:text-lg">
              Flagship wireless noise cancelling, re-engineered for a world that never stops.
            </p>
          </motion.div>

          {/* SOUND & UPSCALING */}
          <motion.div
            style={{ opacity: soundOpacity, y: soundY }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-32 px-4 text-center"
          >
            <div className="max-w-2xl bg-[#0A0A0C]/20 p-8 rounded-3xl backdrop-blur-md border border-white/5 mx-auto">
              <h3 className="text-4xl font-semibold tracking-tight text-white mb-4">
                Immersive, lifelike sound.
              </h3>
              <p className="text-white/60 mb-2 md:text-lg">
                High-performance drivers unlock detail, depth, and texture in every track.
              </p>
              <p className="text-white/60 md:text-lg">
                AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
              </p>
            </div>
          </motion.div>

          {/* REASSEMBLY & CTA */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-4 pointer-events-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 pb-1 text-center">
              Hear everything.<br />Feel nothing else.
            </h2>
            <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-8 max-w-lg text-center mx-auto">
              WH-1000XM6. Designed for focus, crafted for comfort.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function NoiseCancellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.2, 0.8, 0.95], [50, 0, 0, -50]);

  return (
    <div ref={containerRef} className="relative h-[400vh]" id="noise-cancelling">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none mix-blend-screen">
          <CanvasSequence progress={scrollYProgress} folderPath="/sequence-2" frameCount={240} />
        </div>

        <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
          <motion.div
            style={{ opacity: textOpacity, x: textX }}
            className="absolute inset-0 flex flex-col justify-center items-end px-8 md:px-24"
          >
            <div className="max-w-md bg-[#0A0A0C]/40 p-8 rounded-3xl backdrop-blur-md border border-white/5 text-right">
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                Adaptive Noise Cancelling
              </h3>
              <p className="text-white/60 text-lg mb-4">
                Real-time noise analysis adjusts to your environment intelligently.
              </p>
              <ul className="text-white/60 space-y-3 flex flex-col items-end">
                <li className="flex items-center gap-3">
                  Multi-microphone array listens in every direction.
                </li>
                <li className="flex items-center gap-3">
                  Your music stays pure—planes, trains, and crowds fade away.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TechnologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.2, 0.8, 0.95], [-50, 0, 0, 50]);

  return (
    <div ref={containerRef} className="relative h-[400vh]" id="technology">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none mix-blend-screen">
          <CanvasSequence progress={scrollYProgress} folderPath="/sequence-3" frameCount={200} />
        </div>

        <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
          <motion.div
            style={{ opacity: textOpacity, x: textX }}
            className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-24"
          >
            <div className="max-w-md bg-[#0A0A0C]/40 p-8 rounded-3xl backdrop-blur-md border border-white/5 text-left">
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                Precision 30mm Driver
              </h3>
              <p className="text-white/60 text-lg mb-4">
                Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
              </p>
              <p className="text-white/60 text-lg">
                Every component is tuned for exceptional balance, power, and depth.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const cards = [
    { title: "Spatial Audio", desc: "Sound that surrounds you with precision tracking." },
    { title: "All-Day Comfort", desc: "Evolved synthetic leather structure and light chassis." },
    { title: "Smart Controls", desc: "Intuitive touch, edge, and voice commands." },
    { title: "Long Battery Life", desc: "Up to 30 hours of playback with quick charge." },
  ];

  return (
    <section className="relative z-30 min-h-screen bg-[#050505] flex items-center justify-center border-t border-white/5 py-32 px-4" id="features">
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white/90">
            Intelligently designed.
          </h2>
          <p className="text-white/60 md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
            The WH-1000XM6 redefines personal audio. You wear the music, not the headphones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {cards.map((feature, i) => (
            <motion.div
              key={i}
              className="group bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-md text-left transition-all hover:bg-white/10 hover:border-sony-blue/30 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sony-blue/0 to-sony-cyan/0 group-hover:from-sony-blue/10 group-hover:to-sony-cyan/5 transition-colors duration-500 rounded-3xl"></div>
              <h4 className="text-white font-semibold text-2xl mb-3 relative z-10">{feature.title}</h4>
              <p className="text-white/60 text-base relative z-10">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10 px-8" id="buy">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex flex-col">
          <h3 className="text-white font-bold text-2xl tracking-tight mb-2">WH-1000XM6</h3>
          <p className="text-white/50 text-sm max-w-sm">
            Experience the next generation of premium wireless noise cancelling headphones.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button className="relative group px-8 py-4 rounded-full overflow-hidden flex items-center justify-center">
            <span className="absolute inset-0 bg-gradient-to-r from-sony-blue to-sony-cyan opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative text-sm font-semibold text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 flex items-center gap-2">
              Buy Now
            </span>
          </button>
          <a href="#overview" className="text-white/60 hover:text-white transition-colors text-sm font-medium hover:underline underline-offset-4 pointer-events-auto">
            Back to top
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-xs text-center md:text-left">
          &copy; 2026 Sony Electronics Inc. All rights reserved.
        </p>
        <p className="text-white/40 text-xs">
          Designed & Developed by <a href="https://www.linkedin.com/in/ashish-sharma-66031b268" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">Ashish Sharma</a>
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative bg-[#050505] selection:bg-sony-blue/30 text-white font-sans">
      <Navbar />
      <HeroSection />
      <NoiseCancellingSection />
      <TechnologySection />
      <FeaturesSection />
      <FooterSection />
    </main>
  );
}
