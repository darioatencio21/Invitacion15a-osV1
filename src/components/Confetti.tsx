"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Confetti() {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.6 },
        colors: ["#c9a96e", "#e8c4c4", "#f5e6e6", "#f7f0e8"],
        shapes: ["circle"],
        ticks: 60,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.6 },
        colors: ["#c9a96e", "#e8c4c4", "#f5e6e6", "#f7f0e8"],
        shapes: ["circle"],
        ticks: 60,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
}
