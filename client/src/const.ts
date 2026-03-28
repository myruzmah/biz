export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Returns the login page URL. All auth redirects go to the staff login page.
export const getLoginUrl = (_returnPath?: string): string => "/login";
