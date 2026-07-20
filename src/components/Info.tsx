"use client";

import { motion } from "framer-motion";
import { CONFIG, EASING } from "@/config";

const items = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    label: "Fecha",
    value: CONFIG.date,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Hora",
    value: CONFIG.time,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Lugar",
    value: CONFIG.location,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    label: "Dress Code",
    value: CONFIG.dressCode,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASING },
  },
};

export default function Info() {
  return (
    <section className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-10 sm:mb-16 md:mb-20"
        >
          <p className="font-serif text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold mb-3 sm:mb-4">Detalles</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-soft-black">El evento</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              className="group relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 cursor-default"
              style={{
                background: "rgba(247,240,232,0.15)",
                border: "1px solid rgba(201,169,110,0.1)",
              }}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(201,169,110,0.3)",
                boxShadow: "0 20px 60px rgba(201,169,110,0.12)",
              }}
            >
              <div className="flex items-start gap-3 sm:gap-5">
                <div className="text-gold/60 group-hover:text-gold transition-colors duration-500 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-1.5">
                    {item.label}
                  </p>
                  <p className="font-serif text-sm sm:text-base md:text-lg text-soft-black">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
