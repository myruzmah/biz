import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogImage?: string;    // NEW
  canonical?: string;  // NEW
}

export default function PageMeta({ title, description, ogTitle, ogImage, canonical }: PageMetaProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [key, val] = attr.split("=");
        el.setAttribute(key, val.replace(/"/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    if (description) {
      setMeta('meta[name="description"]', 'name="description"', description);
      setMeta('meta[property="og:description"]', 'property="og:description"', description);
      setMeta('meta[name="twitter:description"]', 'name="twitter:description"', description);
    }

    const resolvedOgTitle = ogTitle || title;
    setMeta('meta[property="og:title"]', 'property="og:title"', resolvedOgTitle);
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', resolvedOgTitle);
    setMeta('meta[property="og:type"]', 'property="og:type"', "website");
    setMeta('meta[name="twitter:card"]', 'name="twitter:card"', "summary_large_image");

    const image = ogImage || "https://hamzury.com/og-default.svg";
    setMeta('meta[property="og:image"]', 'property="og:image"', image);
    setMeta('meta[name="twitter:image"]', 'name="twitter:image"', image);

    if (canonical) {
      setMeta('meta[property="og:url"]', 'property="og:url"', canonical);
      setLink("canonical", canonical);
    }
  }, [title, description, ogTitle, ogImage, canonical]);

  return null;
}
