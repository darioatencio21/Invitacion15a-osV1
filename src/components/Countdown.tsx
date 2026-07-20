"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }

    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
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
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="flex flex-col items-center"
    >
      <div className="relative w-20 h-24 md:w-24 md:h-28 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-gold/5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif text-3xl md:text-4xl text-soft-black"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <div className="absolute inset-x-0 top-1/2 h-px bg-gold/10" />
      </div>
      <span className="mt-3 text-[10px] tracking-[0.2em] uppercase text-muted-text font-sans">
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const target = new Date();
  target.setDate(target.getDate() + 30);
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-white to-champagne/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-xs tracking-[0.4em] uppercase text-gold mb-4"
        >
          Faltan
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-3xl md:text-4xl text-soft-black mb-16"
        >
          Para el gran día
        </motion.h2>

        <div className="flex justify-center gap-4 md:gap-8">
          <FlipUnit value={days} label="Días" />
          <FlipUnit value={hours} label="Horas" />
          <FlipUnit value={minutes} label="Min" />
          <FlipUnit value={seconds} label="Seg" />
        </div>
      </div>
    </section>
  );
}
