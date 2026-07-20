"use client";

import { motion, AnimatePresence } from "framer-motion";
import Particles from "./Particles";

interface InviteScreenProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function InviteScreen({ onOpen, isOpen }: InviteScreenProps) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="invite-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <Particles />

          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-sm tracking-[0.4em] uppercase text-gold"
            >
              You&apos;re Invited
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-soft-black tracking-wide"
            >
              [Nombre]
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              <motion.button
                onClick={onOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-12 py-4 border border-gold/40 rounded-full text-sm tracking-[0.25em] uppercase text-soft-black bg-white/60 backdrop-blur-sm overflow-hidden group"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Open Invitation
                </span>
                <motion.div
                  className="absolute inset-0 bg-gold/80"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  style={{ originX: 0 }}
                />
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gold/30"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
