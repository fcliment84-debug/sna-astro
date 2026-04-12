import { useState, useEffect, useCallback } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  layout: "1x1" | "2x1" | "1x2";
  contain?: boolean;
}

interface Props {
  images: GalleryImage[];
}

export default function ProjectGalleryLightbox({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };

  return (
    <>
      {/* Thumbnail grid — rendered by parent Astro, this is the interactive overlay */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
          gridAutoRows: "280px",
        }}
        className="lg:!auto-rows-[360px]"
      >
        {images.map((img, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onClick={() => openAt(i)}
            onKeyDown={(e) => e.key === "Enter" && openAt(i)}
            style={{
              overflow: "hidden",
              borderRadius: "0.5rem",
              cursor: "pointer",
              ...(img.layout === "2x1" ? { gridColumn: "span 2" } : {}),
              ...(img.layout === "1x2" ? { gridRow: "span 2" } : {}),
              ...(img.contain ? { backgroundColor: "hsl(210 9% 96% / 0.3)" } : {}),
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: img.contain ? "contain" : "cover",
                transition: "transform 0.5s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        ))}
      </div>

      {/* Lightbox overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "white",
              background: "none",
              border: "none",
              fontSize: "2rem",
              cursor: "pointer",
              lineHeight: 1,
              padding: "0.5rem",
              zIndex: 10,
            }}
          >
            &times;
          </button>

          {/* Counter */}
          <span
            style={{
              position: "absolute",
              top: "1.25rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.875rem",
              zIndex: 10,
            }}
          >
            {idx + 1} / {images.length}
          </span>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              &#8249;
            </button>
          )}

          {/* Image */}
          <img
            src={images[idx].src}
            alt={images[idx].alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: "0.25rem",
            }}
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </>
  );
}
