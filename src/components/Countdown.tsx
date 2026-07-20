"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG, EASING } from "@/config";

function calcTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASING }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 8px 32px rgba(201,169,110,0.08)",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: EASING }}
            className="font-serif text-xl sm:text-3xl md:text-4xl text-soft-black"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <div className="absolute inset-x-0 top-1/2 h-px bg-gold/10" />
      </div>
      <span className="mt-2 sm:mt-3 text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-text font-sans">
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const target = new Date(CONFIG.countdownTarget);
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <section className="relative py-16 sm:py-20 md:py-32 px-6 bg-gradient-to-b from-white to-champagne/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="font-serif text-xs tracking-[0.4em] uppercase text-gold mb-4"
        >
          Faltan
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASING }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-soft-black mb-8 sm:mb-12 md:mb-16"
        >
          Para el gran día
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:flex md:justify-center md:gap-8 max-w-[200px] sm:max-w-none mx-auto">
          <FlipUnit value={days} label="Días" />
          <FlipUnit value={hours} label="Horas" />
          <FlipUnit value={minutes} label="Min" />
          <FlipUnit value={seconds} label="Seg" />
        </div>
      </div>
    </section>
  );
}
