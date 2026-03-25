const AFFILIATE_KEY = "hamzury-affiliate-session";
const TTL = 8 * 60 * 60 * 1000; // 8 hours

export function saveAffiliateSession(data: Record<string, unknown>) {
  localStorage.setItem(AFFILIATE_KEY, JSON.stringify({ data, expiresAt: Date.now() + TTL }));
}

export function getAffiliateSession(): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(AFFILIATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(AFFILIATE_KEY);
      return null;
    }
    return parsed.data ?? null;
  } catch {
    return null;
  }
}

export function clearAffiliateSession() {
  localStorage.removeItem(AFFILIATE_KEY);
}
