"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Loader2, PartyPopper } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  email: string;
  phone: string;
  date: string;
  city: string;
  budget: string;
  guests: string;
  venue: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  date: "",
  city: "",
  budget: "",
  guests: "",
  venue: "",
  message: "",
};

const selectClass =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function ConsultationForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = React.useState<Fields>(empty);
  const [errors, setErrors] = React.useState<Partial<Fields>>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");

  const set = (k: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const next: Partial<Fields> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address.";
    if (!/^[\d+\s()-]{7,}$/.test(values.phone))
      next.phone = "Enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // Simulate a network request (wire up to an API route / email service here).
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-3xl border border-primary/30 bg-primary/5 p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="grid size-16 place-items-center rounded-full bg-primary text-white shadow-gold"
        >
          <Check className="size-8" />
        </motion.span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
          Thank you, {values.name.split(" ")[0] || "friend"}!
        </h3>
        <p className="mt-2 max-w-sm text-muted">
          Your consultation request is in. Our team will reach out within 24
          hours to begin designing your dream wedding.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-dark">
          <PartyPopper className="size-4" /> Here&apos;s to your happily ever after
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setValues(empty);
            setStatus("idle");
          }}
        >
          Submit another request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className={cn("grid gap-5", compact ? "sm:grid-cols-1" : "sm:grid-cols-2")}>
        <Field label="Full Name" required error={errors.name}>
          <Input
            value={values.name}
            onChange={set("name")}
            placeholder="Priya Sharma"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <Input
            type="email"
            value={values.email}
            onChange={set("email")}
            placeholder="you@email.com"
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <Input
            type="tel"
            value={values.phone}
            onChange={set("phone")}
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
          />
        </Field>
        <Field label="Wedding Date">
          <Input type="date" value={values.date} onChange={set("date")} />
        </Field>
        <Field label="City / Destination">
          <Input value={values.city} onChange={set("city")} placeholder="Udaipur" />
        </Field>
        <Field label="Venue (if any)">
          <Input value={values.venue} onChange={set("venue")} placeholder="Palace, beach, etc." />
        </Field>
        <Field label="Estimated Budget">
          <select value={values.budget} onChange={set("budget")} className={selectClass}>
            <option value="">Select a range</option>
            <option>Under ₹10 Lakhs</option>
            <option>₹10 – 25 Lakhs</option>
            <option>₹25 – 50 Lakhs</option>
            <option>₹50 Lakhs – 1 Crore</option>
            <option>Above ₹1 Crore</option>
          </select>
        </Field>
        <Field label="Number of Guests">
          <select value={values.guests} onChange={set("guests")} className={selectClass}>
            <option value="">Select guest count</option>
            <option>Up to 100</option>
            <option>100 – 250</option>
            <option>250 – 500</option>
            <option>500+</option>
          </select>
        </Field>
      </div>

      <Field label="Tell us about your dream wedding">
        <Textarea
          value={values.message}
          onChange={set("message")}
          placeholder="Share your vision, theme, must-haves or any questions…"
        />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          "Book My Free Consultation"
        )}
      </Button>
      <p className="text-center text-xs text-muted">
        By submitting, you agree to be contacted by MarryMuse. We never share your details.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>
        {label} {required && <span className="text-accent">*</span>}
      </Label>
      {children}
      {error && <p className="mt-1 text-xs text-accent">{error}</p>}
    </div>
  );
}
