import { useEffect, useRef, useState } from "react";

/**
 * Renders a Cloudflare Turnstile widget and exposes the resulting token
 * via the `onVerify` callback. The Turnstile API script itself is loaded
 * globally from BaseLayout.astro.
 *
 * The site key comes from the PUBLIC_TURNSTILE_SITE_KEY env var (prefixed
 * with PUBLIC_ so Astro exposes it to the client bundle). If the variable
 * is missing, the widget silently does nothing and `onVerify("")` is
 * called on mount, so forms keep working during local development.
 */
interface Props {
  onVerify: (token: string) => void;
  lang?: "es" | "en";
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          language?: string;
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function TurnstileWidget({ onVerify, lang = "es" }: Props) {
  const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderedRef = useRef(false);
  const [ready, setReady] = useState(false);

  // If no site key configured, pass through without blocking the form.
  useEffect(() => {
    if (!siteKey) {
      onVerify("");
      return;
    }
    let cancelled = false;
    const tryRender = () => {
      if (cancelled) return;
      if (!window.turnstile || !containerRef.current || renderedRef.current) {
        return;
      }
      window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onVerify(token),
        "expired-callback": () => onVerify(""),
        "error-callback": () => onVerify(""),
        theme: "light",
        language: lang === "en" ? "en" : "es",
      });
      renderedRef.current = true;
      setReady(true);
    };
    tryRender();
    // Script may still be loading on first effect run — poll briefly.
    const interval = window.setInterval(() => {
      if (renderedRef.current) {
        window.clearInterval(interval);
        return;
      }
      tryRender();
    }, 250);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!siteKey) return null;
  return (
    <div className="turnstile-wrapper" aria-hidden={!ready}>
      <div ref={containerRef} />
    </div>
  );
}
