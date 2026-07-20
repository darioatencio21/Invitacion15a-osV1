"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG, EASING } from "@/config";

const placeholders = [
  "from-emerald/10 to-sage",
  "from-sage to-mint",
  "from-mint to-emerald/5",
  "from-sage to-emerald/10",
  "from-emerald/5 to-sage",
  "from-mint to-sage",
];

const images = Array.from(
  { length: Math.max(CONFIG.galleryImages.length, 6) },
  (_, i) => ({
    id: i + 1,
    src: CONFIG.galleryImages[i] || `/gallery/${i + 1}.jpg`,
    alt: `Foto ${i + 1}`,
    gradient: placeholders[i % placeholders.length],
  })
);

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Set<number>>(new Set());

  const currentIndex = selected ? images.findIndex((img) => img.id === selected) : -1;

  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setSelected(images[currentIndex + 1].id);
    }
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelected(images[currentIndex - 1].id);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, goNext, goPrev]);

  return (
    <section className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 bg-mint/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-10 sm:mb-16 md:mb-20"
        >
          <p className="font-serif text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold mb-3 sm:mb-4">Galería</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-soft-black">Recuerdos</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASING }}
              className="group cursor-pointer"
              onClick={() => setSelected(img.id)}
              role="button"
              tabIndex={0}
              aria-label={`Ver foto ${i + 1}`}
              onKeyDown={(e) => { if (e.key === "Enter") setSelected(img.id); }}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] transition-all duration-700"
                style={{
                  boxShadow: "0 8px 24px rgba(201,169,110,0.06)",
                }}
              >
                {!loaded.has(img.id) && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${img.gradient} animate-pulse`} />
                )}
                <div
                  className={`w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-105 ${
                    loaded.has(img.id) ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ backgroundImage: `url('${img.src}')` }}
                  onLoad={() => setLoaded((prev) => new Set(prev).add(img.id))}
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
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelected(null); }}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 text-white/60 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Cerrar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 text-white/40 hover:text-white transition-colors"
                aria-label="Anterior"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {currentIndex < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-white/40 hover:text-white transition-colors"
                aria-label="Siguiente"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            <motion.div
              key={selected}
              initial={{ scale: 0.92, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.92, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: EASING }}
              className="max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const img = images.find((img) => img.id === selected);
                const isLoaded = img ? loaded.has(img.id) : false;
                return (
                  <div
                    className="w-full h-full min-h-[50vh] bg-cover bg-center"
                    style={{
                      backgroundImage: isLoaded
                        ? `url('${img?.src}')`
                        : undefined,
                      background: !isLoaded
                        ? "linear-gradient(135deg, #c9dac4, #e2efe2)"
                        : undefined,
                    }}
                  />
                );
              })()}
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-wider font-sans">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
