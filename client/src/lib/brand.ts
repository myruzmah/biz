/**
 * HAMZURY Brand Design Tokens
 * Each department has its own Primary Accent Color.
 * All other values are shared across the institution.
 */

export const BRAND = {
  // Shared across all departments
  bg: "#F8F5F0",        // Milk
  text: "#2C2C2C",       // Charcoal
  gold: "#C9A97E",       // HAMZURY Gold
  white: "#FFFFFF",

  // Department-specific primary colors
  federal: "#0A1F1C",    // Luxury Dark Green — Main site, CSO, CEO, Finance, HR, Founder
  bizdoc: "#1B4D3E",     // Deep Green — BizDoc Consult
  systemise: "#1E3A5F",  // Navy Blue — Systemise
  skills: "#DAA520",     // Gold Yellow — HAMZURY Skills
  ridi: "#C9A97E",       // Gold — RIDI
} as const;

export type DepartmentKey = "federal" | "bizdoc" | "systemise" | "skills" | "ridi";

export const DEPT_COLORS: Record<DepartmentKey, string> = {
  federal: BRAND.federal,
  bizdoc: BRAND.bizdoc,
  systemise: BRAND.systemise,
  skills: BRAND.skills,
  ridi: BRAND.ridi,
};

export const DEPT_LABELS: Record<DepartmentKey, string> = {
  federal: "HAMZURY",
  bizdoc: "BizDoc Consult",
  systemise: "Systemise",
  skills: "HAMZURY Skills",
  ridi: "RIDI",
};
