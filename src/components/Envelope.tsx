"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Particles from "./Particles";
import { CONFIG, EASING, EASING_IN_OUT } from "@/config";

function WaxSeal() {
  return (
    <svg width="48" height="48" viewBox="0 0 56 56" className="drop-shadow-md">
      <circle cx="28" cy="28" r="26" fill="#c9a96e" />
      <circle cx="28" cy="28" r="24" fill="#d4b87a" stroke="#b8944e" strokeWidth="1" />
      <circle cx="28" cy="28" r="20" fill="#c9a96e" />
      <text x="28" y="33" textAnchor="middle" fill="#f7f0e8" fontSize="18" fontWeight="600" fontFamily="Georgia, serif">XV</text>
    </svg>
  );
}

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => onOpen(), 3600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: EASING_IN_OUT }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <Particles />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: EASING }}
        className="relative z-10 font-serif text-[10px] sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold mb-8 sm:mb-12"
      >
        You&apos;re Invited
      </motion.p>

      <div className="relative z-10">
        <button onClick={handleClick} disabled={isAnimating} className="cursor-pointer" aria-label="Open invitation">
          <div className="relative w-[85vw] max-w-[280px]" style={{ height: 200 }}>
            {/* Shadow */}
            <motion.div
              className="absolute inset-0 rounded-b-lg opacity-15"
              style={{ background: "#c9a96e", translateY: 6 }}
              animate={!isAnimating ? { translateY: [6, 10, 6] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Envelope body */}
            <motion.div
              className="absolute inset-0 rounded-b-lg"
              style={{
                background: "linear-gradient(180deg, #f7f0e8 0%, #f0e8d8 100%)",
                border: "1px solid rgba(201,169,110,0.3)",
                boxShadow: "0 8px 32px rgba(201,169,110,0.12)",
              }}
              animate={!isAnimating ? { translateY: [0, -3, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Inner card — starts hidden below, slides up when opened */}
              <motion.div
                className="absolute inset-x-2 bottom-2 h-[160px] bg-white rounded-md shadow-sm flex flex-col items-center justify-center p-6"
                style={{ boxShadow: "0 -2px 16px rgba(0,0,0,0.04)" }}
                animate={
                  isAnimating
                    ? { translateY: -60, transition: { duration: 0.9, delay: 0.6, ease: EASING } }
                    : { translateY: 200 }
                }
              >
                <span className="font-script text-xl sm:text-3xl md:text-4xl text-emerald mb-2">
                  {CONFIG.name}
                </span>
                <span className="font-serif text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold">
                  XV Años
                </span>
                <div className="mt-3 w-8 h-px bg-gold/30" />
                <span className="mt-3 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text">
                  {CONFIG.date}
                </span>
              </motion.div>
            </motion.div>

            {/* Flap with wax seal */}
            <motion.div
              className="absolute top-0 left-0 right-0 z-20"
              initial={{ rotateX: 0 }}
              animate={isAnimating ? { rotateX: 180 } : {}}
              transition={{ duration: 0.7, ease: EASING }}
              style={{ transformOrigin: "top center", perspective: 1000, height: 105 }}
            >
              <div
                className="w-full h-full relative"
                style={{
                  background: "linear-gradient(180deg, #e8dcc8 0%, #f7f0e8 60%)",
                  border: "1px solid rgba(201,169,110,0.3)",
                  borderBottom: "none",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              >
                {/* Wax seal on the flap */}
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2"
                  animate={!isAnimating ? { scale: [1, 1.03, 1] } : { opacity: 0, scale: 0.5 }}
                  transition={
                    !isAnimating
                      ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.4, ease: EASING }
                  }
                >
                  <WaxSeal />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </button>

        {!isAnimating && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-6 sm:mt-8 text-gold/50 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-sans text-center"
          >
            Toca para abrir
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
