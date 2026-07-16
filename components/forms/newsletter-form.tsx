"use client";

import * as React from "react";
import { Send, Check } from "lucide-react";

/** Newsletter signup — client-side validation with an optimistic success state. */
export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
    setEmail("");
  };

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary-light">
        <Check className="size-4" /> You&apos;re on the list — welcome!
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2" noValidate>
      <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-primary/60">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="h-12 w-full bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="grid w-12 shrink-0 place-items-center bg-primary text-white transition-colors hover:bg-primary-dark"
        >
          <Send className="size-4" />
        </button>
      </div>
      {error && <p className="px-2 text-xs text-accent-light">{error}</p>}
    </form>
  );
}
