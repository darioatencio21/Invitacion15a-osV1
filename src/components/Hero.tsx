"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100vh] min-h-[700px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 to-white/30" />
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundColor: "#f5e6e6",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-white tracking-wide drop-shadow-lg"
        >
          [Nombre]
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-6 mt-4"
        >
          <span className="font-serif text-3xl md:text-4xl text-white/90 drop-shadow-md">XV</span>
          <span className="w-px h-8 bg-white/40" />
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-white/80 drop-shadow-md">
            [Fecha]
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
