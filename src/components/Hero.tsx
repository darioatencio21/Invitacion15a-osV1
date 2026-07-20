"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CONFIG, EASING } from "@/config";

function Crown() {
  return (
    <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold mb-2">
      <path
        d="M4 28L10 4L18 14L24 2L30 14L38 4L44 28H4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="24" cy="16" r="2" fill="currentColor" />
      <circle cx="10" cy="12" r="1.5" fill="currentColor" />
      <circle cx="38" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: pageProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[200] origin-left bg-emerald/60"
        style={{ scaleX: pageProgress }}
      />

      <section ref={ref} className="relative h-[100dvh] min-h-[90dvh] md:min-h-[700px] overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${CONFIG.heroImage}')`,
              backgroundColor: "#e2efe2",
            }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/0 to-white/0" />

        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: EASING }}
          >
            <Crown />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASING }}
            className="font-script text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-gold tracking-wide drop-shadow-sm px-2"
          >
            {CONFIG.name}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: EASING }}
            className="flex items-center justify-center gap-3 sm:gap-6 mt-4 flex-wrap px-4"
          >
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold/90">XV</span>
            <span className="w-px h-6 sm:h-8 bg-gold/30 shrink-0" role="separator" />
            <span className="font-sans text-[10px] sm:text-sm tracking-[0.15em] sm:tracking-[0.3em] uppercase text-gold/80 whitespace-nowrap">
              {CONFIG.date}
            </span>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gold/20"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-white to-transparent" />
      </section>
    </>
  );
}
