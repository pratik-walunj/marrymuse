import * as React from "react";
import Markdoc from "@markdoc/markdoc";

type Renderable = Parameters<typeof Markdoc.renderers.react>[0];

/**
 * Renders Keystatic Markdoc content into React elements, styled via the
 * Tailwind Typography `prose` container.
 *
 * The Keystatic reader hands back a raw Markdoc AST node ($$mdtype: "Node"),
 * so we transform it into a serialisable renderable tree before rendering.
 */
export function MarkdocContent({ node }: { node: unknown }) {
  // Some Keystatic versions wrap the AST as `{ node }`; unwrap defensively.
  const raw =
    node && typeof node === "object" && "node" in node
      ? (node as { node: unknown }).node
      : node;

  const renderable: Renderable =
    raw && typeof raw === "object" && (raw as { $$mdtype?: string }).$$mdtype === "Node"
      ? Markdoc.transform(raw as Parameters<typeof Markdoc.transform>[0])
      : (raw as Renderable);

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-h2:mt-10 prose-h2:text-3xl prose-p:text-muted prose-p:leading-relaxed prose-a:text-primary-dark prose-a:font-medium prose-strong:text-ink prose-blockquote:border-l-primary prose-blockquote:bg-secondary prose-blockquote:rounded-r-2xl prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:text-ink prose-li:text-muted prose-img:rounded-2xl">
      {Markdoc.renderers.react(renderable, React)}
    </div>
  );
}
