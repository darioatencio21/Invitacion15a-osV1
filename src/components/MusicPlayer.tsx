"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG, EASING } from "@/config";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const hasSong = CONFIG.song && CONFIG.song.length > 0;

  useEffect(() => {
    if (!hasSong) return;
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [hasSong]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  if (!hasSong) return null;

  return (
    <div className="fixed right-3 sm:right-6 z-[150] flex flex-col items-end" style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: EASING }}
            className="mb-2 p-3 rounded-2xl min-w-[180px]"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(201,169,110,0.2)",
              boxShadow: "0 8px 32px rgba(201,169,110,0.1)",
            }}
          >
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2 truncate">
              {playing ? "Reproduciendo" : "Pausado"}
            </p>
            <div className="relative h-1 rounded-full bg-gold/10 mb-2 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold/60 rounded-full"
                style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs text-muted-text">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <button
                onClick={togglePlay}
                className="text-gold hover:text-emerald transition-colors"
                aria-label={playing ? "Pausar" : "Reproducir"}
              >
                {playing ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={togglePlay}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(201,169,110,0.2)",
          boxShadow: "0 4px 16px rgba(201,169,110,0.12)",
        }}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {playing ? (
            <>
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </>
          ) : (
            <>
              <polygon points="9,18 9,6 20,12" fill="#c9a96e" stroke="none" />
              <circle cx="12" cy="12" r="9" />
            </>
          )}
        </svg>
      </motion.button>

      <audio ref={audioRef} src={CONFIG.song} preload="auto" loop />
    </div>
  );
}
