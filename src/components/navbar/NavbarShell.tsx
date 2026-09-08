"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function NavbarShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    let raf: number | null = null;
    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < lastY.current || y < 50) {
          setHidden(false);
        } else if (y > lastY.current && y > 100) {
          setHidden(true);
        }
        setShadow(y > 50);
        lastY.current = y;
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      ref={ref}
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 300ms ease",
        willChange: "transform",
      }}
      className={`bg-background/95 supports-[backdrop-filter]:bg-background/80 fixed top-0 z-50 w-full border-b backdrop-blur-lg ${shadow ? "shadow-md" : ""}`}
    >
      {children}
    </header>
  );
}
