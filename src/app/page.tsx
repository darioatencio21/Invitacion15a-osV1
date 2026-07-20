"use client";

import { useState } from "react";
import InviteScreen from "@/components/InviteScreen";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Info from "@/components/Info";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <InviteScreen onOpen={() => setIsOpen(true)} isOpen={isOpen} />

      {isOpen && (
        <SmoothScroll>
          <main>
            <Hero />
            <Countdown />
            <Info />
            <Gallery />
            <RSVP />

            <footer className="py-16 px-6 text-center bg-champagne/10">
              <p className="font-serif text-xs tracking-[0.3em] uppercase text-muted-text">
                Con amor, [Nombre]
              </p>
              <div className="mt-6 w-px h-8 bg-gold/20 mx-auto" />
            </footer>
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
