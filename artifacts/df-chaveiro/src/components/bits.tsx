import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { wa } from "@/lib/site";

export function Reveal({ children, delay = 0, y = 36, className = "", x = 0 }: { children: ReactNode; delay?: number; y?: number; x?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y, x }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function Parallax({ children, amount = 60, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [amount, -amount]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function Words({ text, className = "", delay = 0, accent = [] as number[] }: { text: string; className?: string; delay?: number; accent?: number[] }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.22em]" aria-hidden>
          <motion.span className={`inline-block ${accent.includes(i) ? "text-[#feaa2e]" : ""}`} initial={reduce ? false : { y: "12%", opacity: 0.8 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function WaButton({ msg, children, className = "", id, dark = false }: { msg: string; children: ReactNode; className?: string; id: string; dark?: boolean }) {
  return (
    <a data-testid={`button-whatsapp-${id}`} href={wa(msg)} target="_blank" rel="noopener noreferrer"
      className={`btn-y group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-bold text-base transition-transform duration-300 hover:-translate-y-1 active:scale-95 ${dark ? "bg-black text-[#feaa2e]" : "bg-[#feaa2e] text-black"} ${className}`}>
      <FaWhatsapp className="h-5 w-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
      {children}
    </a>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) { setV(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1600, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, reduce]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/** Muted looping video that only downloads once near the viewport. */
export function LazyLoopVideo({ src, poster, className = "", soundToggle, testid }: { src: string; poster: string; className?: string; soundToggle?: ReactNode; testid?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); el.play().catch(() => {}); } else el.pause();
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);
  return (
    <>
      <video ref={ref} data-testid={testid} className={className} poster={poster} src={active ? src : undefined} autoPlay={active && !reduce} muted loop playsInline preload="none" />
      {soundToggle}
    </>
  );
}
