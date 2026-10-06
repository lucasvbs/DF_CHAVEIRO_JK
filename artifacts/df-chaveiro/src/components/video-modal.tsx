import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { VIDEOS } from "@/lib/site";

export function VideoModal({ index, onClose, onChange }: { index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % VIDEOS.length);
      if (e.key === "ArrowLeft") onChange((index + VIDEOS.length - 1) % VIDEOS.length);
    };
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", k); };
  }, [index, onClose, onChange]);
  const v = index !== null ? VIDEOS[index] : null;
  return (
    <AnimatePresence>
      {v && index !== null && (
        <motion.div role="dialog" aria-modal="true" aria-label={v.title} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button data-testid="button-video-close" aria-label="Fechar vídeo" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-[#feaa2e] p-3 text-black transition-transform hover:rotate-90"><X className="h-5 w-5" /></button>
          <button data-testid="button-video-prev" aria-label="Vídeo anterior" onClick={(e) => { e.stopPropagation(); onChange((index + VIDEOS.length - 1) % VIDEOS.length); }} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-[#feaa2e] hover:text-black md:left-8"><ChevronLeft /></button>
          <button data-testid="button-video-next" aria-label="Próximo vídeo" onClick={(e) => { e.stopPropagation(); onChange((index + 1) % VIDEOS.length); }} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-[#feaa2e] hover:text-black md:right-8"><ChevronRight /></button>
          <motion.div key={index} initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: "spring", damping: 24, stiffness: 240 }} className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <video data-testid="video-modal-player" className="max-h-[78dvh] w-auto max-w-[88vw] rounded-2xl bg-black shadow-2xl ring-1 ring-[#feaa2e]/40" src={v.src} poster={v.poster} controls autoPlay playsInline />
            <p className="mt-4 text-center font-display text-2xl text-white"><span className="text-[#feaa2e]">{String(index + 1).padStart(2, "0")}/05</span> &nbsp;{v.title}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
