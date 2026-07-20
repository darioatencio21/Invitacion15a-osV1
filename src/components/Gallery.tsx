"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const placeholders = [
  "from-pink-200 to-rose-200",
  "from-rose-100 to-pink-100",
  "from-champagne to-rose-100",
  "from-pink-100 to-rose-200",
  "from-rose-200 to-champagne",
  "from-champagne to-pink-200",
];

const images = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/${i + 1}.jpg`,
  alt: `Foto ${i + 1}`,
  gradient: placeholders[i],
}));

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 bg-champagne/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-center mb-20"
        >
          <p className="font-serif text-xs tracking-[0.4em] uppercase text-gold mb-4">Galería</p>
          <h2 className="font-serif text-3xl md:text-4xl text-soft-black">Recuerdos</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
              className="group cursor-pointer"
              onClick={() => setSelected(img.id)}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg shadow-gold/5">
                <div
                  className={`w-full h-full bg-gradient-to-br ${img.gradient} transition-all duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-soft-black/0 group-hover:bg-soft-black/10 transition-all duration-500 flex items-center justify-center">
                  <span className="font-serif text-white/60 text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Ver foto
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              key={selected}
              initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="max-w-3xl w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${images.find((img) => img.id === selected)?.gradient}`}
              />
            </motion.div>

            <button
              onClick={() => setSelected(null)}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
