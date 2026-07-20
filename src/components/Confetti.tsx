"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Confetti() {
  useEffect(() => {
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#0d7a5f", "#c9dac4", "#c9a96e", "#e2efe2"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.6 },
        colors,
        shapes: ["circle"],
        ticks: 60,
        scalar: 0.8,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.6 },
        colors,
        shapes: ["circle"],
        ticks: 60,
        scalar: 0.8,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
}
