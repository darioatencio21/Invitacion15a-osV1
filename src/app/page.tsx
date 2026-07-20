"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "@/components/Particles";
import Envelope from "@/components/Envelope";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Info from "@/components/Info";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import MusicPlayer from "@/components/MusicPlayer";
import { CONFIG, EASING } from "@/config";

function CrownDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <span className="w-12 h-px bg-gold/20" />
      <svg width="20" height="16" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold/30">
        <path d="M4 28L10 4L18 14L24 2L30 14L38 4L44 28H4Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <circle cx="24" cy="16" r="2" fill="currentColor" />
        <circle cx="10" cy="12" r="1.5" fill="currentColor" />
        <circle cx="38" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <span className="w-12 h-px bg-gold/20" />
    </div>
  );
}

function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASING }}
      className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
    />
  );
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <Particles />}

      <AnimatePresence>
        {!isOpen && <Envelope onOpen={() => setIsOpen(true)} />}
      </AnimatePresence>

      {isOpen && <MusicPlayer />}

      {isOpen && (
        <SmoothScroll>
          <main>
            <Hero />
            <CrownDivider />
            <Countdown />
            <SectionDivider />
            <Info />
            <SectionDivider />
            <Gallery />
            <SectionDivider />
            <RSVP />

            <footer className="py-10 sm:py-16 px-4 sm:px-6 text-center bg-mint/10">
              <CrownDivider />
              <p className="font-script text-base sm:text-lg text-emerald/60 mb-3 sm:mb-4">
                {CONFIG.name}
              </p>
              <p className="font-serif text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-muted-text">
                Con amor
              </p>
              <div className="mt-4 sm:mt-6 w-px h-6 sm:h-8 bg-gold/20 mx-auto" />
            </footer>
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
