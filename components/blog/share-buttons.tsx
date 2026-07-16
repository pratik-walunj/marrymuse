"use client";

import * as React from "react";
import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";

/** Social share row for blog posts. */
export function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = React.useState(false);
  const [url, setUrl] = React.useState(path);

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const enc = encodeURIComponent;
  const links = [
    { icon: Twitter, label: "Share on Twitter", href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
    { icon: Facebook, label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { icon: Linkedin, label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted">
        Share
      </span>
      {links.map(({ icon: Ic, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink transition-all hover:border-primary hover:bg-primary hover:text-white"
        >
          <Ic className="size-4" />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink transition-all hover:border-primary hover:bg-primary hover:text-white"
      >
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
