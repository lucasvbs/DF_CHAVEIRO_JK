import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function Privacy({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Política de privacidade" className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 md:items-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }} onClick={(e) => e.stopPropagation()} className="relative max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-7 text-black md:rounded-3xl md:p-10">
            <button data-testid="button-privacy-close" aria-label="Fechar" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-black p-2 text-[#feaa2e]"><X className="h-5 w-5" /></button>
            <h2 className="font-display text-4xl">Política de <span className="bg-[#feaa2e] px-2">privacidade</span></h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-black/80">
              <p>Este site é informativo. Ele apresenta os serviços da DF Chaveiro JK e leva você ao nosso WhatsApp para pedir orçamento. Não temos formulários, cadastro ou área de login.</p>
              <p><strong>Dados que coletamos.</strong> O site não coleta dados pessoais por conta própria e não usa cookies de publicidade nem pixels de rastreamento. Ao clicar em um botão de WhatsApp, você é direcionado ao aplicativo, e a conversa passa a seguir as regras do próprio WhatsApp.</p>
              <p><strong>Uso das informações da conversa.</strong> Nome, telefone e detalhes do serviço enviados por você no WhatsApp são usados apenas para responder ao orçamento e prestar o atendimento solicitado.</p>
              <p><strong>Serviços de terceiros.</strong> O mapa é fornecido pelo Google Maps e os vídeos são servidos diretamente por este site. Ao carregar o mapa, o Google pode tratar dados conforme sua própria política.</p>
              <p><strong>Seus direitos (LGPD).</strong> Você pode pedir informações, correção ou exclusão de dados que tenha nos enviado pelo WhatsApp, escrevendo para o mesmo número de atendimento.</p>
              <p><strong>Contato.</strong> WhatsApp +55 (61) 99675-7995. Av. Hélio Prates, QNM 34, Área Especial 01, M Norte, Shopping JK.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
