"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./Confetti";

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    attendance: "",
    guests: "0",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative py-32 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
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
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-center py-20"
            >
              <Confetti />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-serif text-5xl md:text-6xl text-soft-black mb-6"
              >
                ¡Gracias!
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-sans text-muted-text text-sm tracking-wide"
              >
                Hemos recibido tu confirmación
              </motion.p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gold/20 text-soft-black font-serif text-lg focus:border-gold outline-none transition-colors duration-300 placeholder:text-muted-text/40"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gold/20 text-soft-black font-serif text-lg focus:border-gold outline-none transition-colors duration-300 placeholder:text-muted-text/40"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-3">
                    ¿Asistirás?
                  </label>
                  <div className="flex gap-4">
                    {["Sí", "No"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm({ ...form, attendance: opt })}
                        className={`px-8 py-3 rounded-full border text-sm tracking-wider transition-all duration-500 ${
                          form.attendance === opt
                            ? "bg-soft-black text-white border-soft-black"
                            : "bg-transparent text-muted-text border-gold/20 hover:border-gold/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2">
                    Acompañantes
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gold/20 text-soft-black font-serif text-lg focus:border-gold outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gold/20 text-soft-black font-serif text-lg focus:border-gold outline-none transition-colors duration-300 resize-none placeholder:text-muted-text/40"
                    placeholder="Escribe algo..."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-soft-black text-white text-sm tracking-[0.25em] uppercase rounded-full hover:bg-gold transition-all duration-500"
              >
                Confirm Attendance
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
