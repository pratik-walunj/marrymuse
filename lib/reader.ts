import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

/** Server-side reader for Keystatic local content. Never import in client code. */
export const reader = createReader(process.cwd(), keystaticConfig);
