"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING } from "@/config";
import Confetti from "./Confetti";

const RSVP_STORAGE_KEY = "rsvp-submitted";

function getStoredRSVP(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(RSVP_STORAGE_KEY) === "true";
}

export default function RSVP() {
  const [submitted] = useState(getStoredRSVP);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    attendance: "",
    guests: "0",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Ingresa tu nombre";
    if (!form.email.trim()) errs.email = "Ingresa tu email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Email inválido";
    if (!form.attendance) errs.attendance = "Selecciona una opción";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    localStorage.setItem(RSVP_STORAGE_KEY, "true");

    const nextInput = document.getElementById("_next-url") as HTMLInputElement;
    if (nextInput) {
      nextInput.value = window.location.origin + window.location.pathname + "?rsvp=done";
    }

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.submit();
      }
    }, 800);
  };

  const fieldClass = (field: string) =>
    `w-full px-0 py-3 bg-transparent border-b text-soft-black font-serif text-lg outline-none transition-colors duration-300 ${
      errors[field] ? "border-red-300" : "border-gold/20 focus:border-gold"
    }`;

  return (
    <section className="relative py-32 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-16"
        >
          <p className="font-serif text-xs tracking-[0.4em] uppercase text-gold mb-4">RSVP</p>
          <h2 className="font-serif text-3xl md:text-4xl text-soft-black">Confirma tu asistencia</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: EASING }}
              className="text-center py-20"
            >
              <Confetti />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASING, type: "spring" }}
                className="text-6xl mb-8"
              >
                ✦
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: EASING }}
                className="font-serif text-5xl md:text-6xl text-soft-black mb-6"
              >
                ¡Gracias!
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: EASING }}
                className="font-sans text-muted-text text-sm tracking-wide"
              >
                Hemos recibido tu confirmación
              </motion.p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              action="https://formsubmit.co/darioatencio23@gmail.com"
              method="POST"
              className="space-y-8"
              noValidate
            >
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_next" id="_next-url" value="" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="✨ Nueva confirmación RSVP - XV Años" />

              <div className="space-y-6">
                <div>
                  <label htmlFor="rsvp-name" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2">
                    Nombre
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    name="name"
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: "" }); }}
                    className={fieldClass("name")}
                    placeholder="Tu nombre"
                  />
                  {errors.name && <p className="text-red-300 text-xs mt-1 font-sans">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="rsvp-email" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2">
                    Email
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    required
                    name="email"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: "" }); }}
                    className={fieldClass("email")}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="text-red-300 text-xs mt-1 font-sans">{errors.email}</p>}
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-3">
                    ¿Asistirás?
                  </label>
                  <div className="flex gap-4" role="radiogroup">
                    {["Sí", "No"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setForm({ ...form, attendance: opt }); if (errors.attendance) setErrors({ ...errors, attendance: "" }); }}
                        className={`px-8 py-3 rounded-full border text-sm tracking-wider transition-all duration-500 ${
                          form.attendance === opt
                            ? "bg-soft-black text-white border-soft-black"
                            : "bg-transparent text-muted-text border-gold/20 hover:border-gold/50"
                        }`}
                        aria-pressed={form.attendance === opt}
                      >
                        {opt}
                      </button>
                    ))}
                    <input type="hidden" name="attendance" value={form.attendance} />
                  </div>
                  {errors.attendance && <p className="text-red-300 text-xs mt-1 font-sans">{errors.attendance}</p>}
                </div>

                <div>
                  <label htmlFor="rsvp-guests" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2">
                    Acompañantes
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min="0"
                    name="guests"
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gold/20 text-soft-black font-serif text-lg focus:border-gold outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-message" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gold/20 text-soft-black font-serif text-lg focus:border-gold outline-none transition-colors duration-300 resize-none placeholder:text-muted-text/40"
                    placeholder="Escribe algo..."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.99 } : {}}
                className="w-full py-4 bg-soft-black text-white text-sm tracking-[0.25em] uppercase rounded-full hover:bg-gold transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Confirm Attendance"
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
