"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "./Particles";
import { CONFIG, EASING, EASING_IN_OUT } from "@/config";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: EASING },
  },
};

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 1.4, ease: EASING },
  },
};

function Sparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: { x: number; y: number; size: number; speed: number; opacity: number; phase: number }[] = [];

    for (let i = 0; i < 8; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1.5,
        speed: 0.005 + Math.random() * 0.01,
        opacity: 0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const sparkle = Math.sin(time * s.speed * 10 + s.phase);
        s.opacity = Math.max(0, sparkle) * 0.6;
        if (s.opacity > 0.01) {
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(time * s.speed * 2);
          ctx.globalAlpha = s.opacity;
          ctx.fillStyle = "#c9a96e";
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            const radius = i % 2 === 0 ? s.size : s.size * 0.3;
            if (i === 0) ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            else ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });
      animationId = requestAnimationFrame(animate);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" aria-hidden="true" />;
}

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: EASING_IN_OUT }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <Particles />
          <Sparkles />

          <div className="absolute top-12 left-1/2 -translate-x-1/2 text-gold/20 font-script text-[200px] leading-none pointer-events-none select-none">
            ✦
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col items-center gap-8 px-6"
          >
            <motion.p
              variants={childVariants}
              className="font-serif text-sm tracking-[0.4em] uppercase text-gold"
            >
              You&apos;re Invited
            </motion.p>

            <motion.h1
              variants={childVariants}
              className="font-script text-6xl md:text-8xl lg:text-9xl text-emerald tracking-wide"
            >
              {CONFIG.name}
            </motion.h1>

            <motion.div variants={buttonVariants}>
              <motion.button
                onClick={onOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-12 py-4 border border-gold/40 rounded-full text-sm tracking-[0.25em] uppercase text-soft-black bg-white/60 backdrop-blur-sm overflow-hidden group"
                aria-label="Open invitation"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Open Invitation
                </span>
                <motion.div
                  className="absolute inset-0 bg-emerald/80"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: EASING_IN_OUT }}
                  style={{ originX: 0 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1.5 }}
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
