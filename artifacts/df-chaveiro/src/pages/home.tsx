import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowUpRight, CarFront, ChevronDown, CreditCard, DoorOpen, KeyRound, Lock, Menu, MapPin, Play, ShieldCheck, Watch, Wrench, X, Navigation, Copy } from "lucide-react";
import { Counter, LazyLoopVideo, Parallax, Reveal, WaButton, Words } from "@/components/bits";
import { VideoModal } from "@/components/video-modal";
import { Privacy } from "@/components/privacy";
import { ADDRESS, IMG, MAP_EMBED, MAP_LINK, MSG, VIDEOS, m, wa } from "@/lib/site";

const Y = "#feaa2e";
const LINKS = [["Serviços", "#servicos"], ["Por dentro", "#videos"], ["A loja", "#loja"], ["Dúvidas", "#faq"]];

function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid || open ? "bg-black/90 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5">
        <a href="#topo" data-testid="link-logo" className="flex h-12 items-center rounded-xl bg-white px-2"><img src={IMG.logo} alt="DF Chaveiro, desde 1985" className="h-10 w-auto" /></a>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map(([l, h]) => <a key={h} href={h} data-testid={`link-nav-${h.slice(1)}`} className="group relative text-sm font-semibold text-white/80 hover:text-white">{l}<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#feaa2e] transition-all duration-300 group-hover:w-full" /></a>)}
          <WaButton id="nav" msg={MSG.default} className="!px-5 !py-2.5 text-sm">Pedir orçamento</WaButton>
        </nav>
        <button data-testid="button-menu" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-full bg-[#feaa2e] p-2.5 text-black md:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden md:hidden">
            <div className="flex flex-col gap-1 px-5 pb-6">
              {LINKS.map(([l, h], i) => (
                <motion.a key={h} href={h} onClick={() => setOpen(false)} data-testid={`link-mobile-${h.slice(1)}`} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 * i }} className="border-b border-white/10 py-4 font-display text-4xl text-white">{l}</motion.a>
              ))}
              <WaButton id="menu" msg={MSG.default} className="mt-5">Pedir orçamento agora</WaButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const TICK = ["Cópia de chave", "Chave de carro", "Abertura de portas", "Troca de segredo", "Fechaduras", "Abertura de cofres", "Conserto de relógios", "Carimbos"];
function Marquee({ dark = false }: { dark?: boolean }) {
  const row = [...TICK, ...TICK];
  return (
    <div className={`overflow-hidden py-4 ${dark ? "bg-black text-[#feaa2e]" : "bg-[#feaa2e] text-black"}`} aria-hidden>
      <div className="marquee">
        {[0, 1].map((k) => <div key={k} className="flex shrink-0">{row.map((t, i) => <span key={i} className="flex items-center font-display text-3xl md:text-4xl">{t}<KeyRound className="mx-6 h-6 w-6" /></span>)}</div>)}
      </div>
    </div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const big = useTransform(scrollY, [0, 800], reduce ? [0, 0] : [0, 160]);
  const phone = useTransform(scrollY, [0, 800], reduce ? [0, 0] : [0, -70]);
  return (
    <section id="topo" className="grain relative min-h-[100dvh] overflow-hidden bg-black pt-24 text-white">
      <motion.div style={{ y: big }} className="pointer-events-none absolute -right-10 top-24 select-none font-display text-[38vw] leading-none text-transparent md:text-[26vw]" aria-hidden>
        <span style={{ WebkitTextStroke: "2px rgba(254,170,46,.28)" }}>1985</span>
      </motion.div>
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#feaa2e]/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 lg:grid-cols-[1.25fr_1fr] lg:pb-24">
        <div>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#feaa2e]/50 px-4 py-1.5 text-sm font-semibold text-[#feaa2e]">
            <MapPin className="h-4 w-4" /> DF Chaveiro JK · Brasília
          </motion.p>
          <h1 className="font-display text-[clamp(3.4rem,6.5vw,6rem)]">
            <Words text="Chaveiro no Shopping JK desde 1985." accent={[2, 3]} delay={0.2} />
          </h1>
          <motion.p initial={{ opacity: 0.8, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-7 max-w-xl text-lg text-white/75">
            Cópias de chaves, programação automotiva, fechaduras e abertura de portas e cofres no Shopping JK, em Brasília. Peça seu orçamento pelo WhatsApp.
          </motion.p>
          <motion.div initial={{ opacity: 0.8, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <WaButton id="hero" msg={MSG.default} className="text-lg">Pedir orçamento agora</WaButton>
            <a href="#videos" data-testid="link-hero-videos" className="group inline-flex items-center gap-2 font-semibold text-white/80 hover:text-[#feaa2e]"><Play className="h-4 w-4 fill-current" /> Ver a loja por dentro <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
          </motion.div>
          <motion.p initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 text-sm text-white/55">Orçamento sem compromisso · Pix e cartão · Atendimento no Shopping JK</motion.p>
        </div>
        <motion.div style={{ y: phone }} className="relative mx-auto w-[min(72vw,320px)] lg:w-[340px]">
          <motion.div initial={{ opacity: 0, rotate: 6, y: 60 }} animate={{ opacity: 1, rotate: 3, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }} whileHover={{ rotate: 0, scale: 1.02 }} className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border-[6px] border-[#feaa2e] bg-neutral-900 shadow-[0_30px_80px_-20px_rgba(254,170,46,.45)]">
            <LazyLoopVideo testid="video-hero" src={VIDEOS[0].src} poster={VIDEOS[0].poster} className="h-full w-full object-cover" />
          </motion.div>
          <motion.div animate={reduce ? {} : { y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -left-6 bottom-16 rounded-2xl bg-white px-4 py-3 text-black shadow-xl">
            <p className="font-display text-4xl leading-none">40+</p><p className="text-xs font-semibold">anos de ofício</p>
          </motion.div>
          <motion.div animate={reduce ? {} : { y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute -right-4 top-10 flex items-center gap-2 rounded-2xl bg-[#feaa2e] px-4 py-3 text-black shadow-xl">
            <CarFront className="h-6 w-6" /><span className="text-xs font-bold leading-tight">Chave de carro<br />com programação</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    [<><Counter to={40} suffix="+" /></>, "anos de experiência no ofício"],
    [<>1985</>, "ano de fundação"],
    [<><CreditCard className="inline h-9 w-9" /></>, "pagamento em Pix e cartão"],
    [<><ShieldCheck className="inline h-9 w-9" /></>, "orçamento antes de qualquer serviço"],
  ] as const;
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 md:grid-cols-4">
        {items.map(([n, l], i) => (
          <Reveal key={i} delay={i * 0.1} className="border-l-4 border-[#feaa2e] pl-5">
            <p className="font-display text-6xl md:text-7xl" data-testid={`text-trust-${i}`}>{n}</p>
            <p className="mt-2 text-sm font-semibold text-black/65">{l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Pain() {
  const pains = [
    "Você saiu de casa e a chave ficou do lado de dentro.",
    "A única cópia da chave do carro sumiu, e agora?",
    "A fechadura está emperrando e você já tem medo de ela travar de vez.",
    "Mudou de casa ou de loja e não sabe quem já teve a chave antiga.",
    "Precisa de uma cópia e não quer arriscar uma chave mal feita que não gira.",
    "Não quer entregar a porta de casa ou da loja pra qualquer pessoa.",
  ];
  return (
    <section className="bg-[#fff8ec] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal><p className="mb-4 text-sm font-bold uppercase tracking-widest text-black/50">Perder a chave nunca acontece em hora boa</p></Reveal>
          <Reveal delay={0.1}><h2 className="font-display text-6xl md:text-8xl">Chave é aquele item <span className="bg-[#feaa2e] px-2">pequeno</span> que, quando falha, para o seu dia inteiro.</h2></Reveal>
          <Reveal delay={0.2}><p className="mt-6 max-w-md text-lg text-black/70">E, na hora do aperto, você quer um chaveiro em quem possa confiar. Você fala com a gente pelo WhatsApp, descreve o que precisa e recebe o orçamento. Simples assim.</p></Reveal>
        </div>
        <ul className="space-y-4">
          {pains.map((p, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }} whileHover={{ x: 8 }} className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,.18)]">
              <span className="font-display text-5xl text-[#feaa2e]">{String(i + 1).padStart(2, "0")}</span>
              <p className="pt-2 text-lg font-semibold leading-snug">{p}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="grain relative overflow-hidden bg-black py-24 text-white md:py-32">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <Parallax amount={40} className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-3xl bg-[#feaa2e]" />
            <img data-testid="img-keys" src={IMG.keys} alt="Chaves nas mãos do chaveiro" loading="lazy" className="relative aspect-[4/5] w-full rounded-3xl object-cover" />
          </div>
        </Parallax>
        <div className="order-1 lg:order-2">
          <Reveal><h2 className="font-display text-6xl md:text-8xl">Tudo da sua chave resolvido <span className="text-[#feaa2e]">num só balcão.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mt-6 text-lg text-white/75">A DF Chaveiro JK reúne no Shopping JK o que você normalmente teria que procurar em três lugares: chave residencial, chave de carro e fechadura.</p></Reveal>
          <Reveal delay={0.2}><p className="mt-4 text-lg text-white/75">São mais de 40 anos de ofício. Cada cópia, cada segredo trocado e cada porta aberta passam por quem já viu de tudo e sabe resolver.</p></Reveal>
          <Reveal delay={0.3}><div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[[KeyRound, "Residencial"], [CarFront, "Carro"], [DoorOpen, "Fechadura"]].map(([I, l], i) => { const Icon = I as typeof KeyRound; return (
              <div key={i} className="group rounded-2xl border border-white/15 p-5 transition-colors hover:border-[#feaa2e] hover:bg-[#feaa2e] hover:text-black"><Icon className="mx-auto h-8 w-8 text-[#feaa2e] transition-transform group-hover:-rotate-12 group-hover:text-black" /><p className="mt-2 text-sm font-bold">{l as string}</p></div>); })}
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}

const BEN = [
  [Copy, "Cópia que gira de primeira", "Duplicação rápida e precisa, sem voltar duas vezes."],
  [Lock, "Mais segurança em casa ou na loja", "Com a troca de segredo, quem tinha a chave antiga deixa de ter acesso."],
  [DoorOpen, "Porta aberta sem dor de cabeça", "Modelagem e abertura feitas com eficiência por quem tem prática."],
  [Wrench, "Fechadura nova e bem montada", "Instalação de fechadura de qualidade, sem improviso."],
  [CarFront, "Chave de carro sem depender da concessionária", "Cópia e programação na própria loja."],
  [ShieldCheck, "Acesso seguro ao que é seu", "Abertura de cofres com cuidado e atendimento reservado."],
  [Watch, "Resolve mais do que chave", "Relógio, bateria, pulseira, tesoura, alicate e carimbo no mesmo lugar."],
  [CreditCard, "Pagamento sem complicação", "Pix e cartão."],
] as const;

function Benefits() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal><h2 className="max-w-4xl font-display text-6xl md:text-8xl">Por que quem já conhece <span className="bg-[#feaa2e] px-2">volta</span></h2></Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {BEN.map(([I, t, d], i) => (
            <Reveal key={t} delay={(i % 4) * 0.08} className={i === 0 || i === 4 ? "md:col-span-2" : ""}>
              <div data-testid={`card-benefit-${i}`} className={`group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 ${i === 0 || i === 4 ? "bg-black text-white" : "bg-[#f6f3ee]"} hover:shadow-2xl`}>
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#feaa2e] transition-transform duration-500 group-hover:scale-x-100" />
                <I className={`h-9 w-9 transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110 ${i === 0 || i === 4 ? "text-[#feaa2e]" : "text-black"}`} />
                <h3 className="mt-6 font-display text-3xl">{t}</h3>
                <p className={`mt-3 text-[15px] ${i === 0 || i === 4 ? "text-white/70" : "text-black/65"}`}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal><div className="mt-12 flex justify-center"><WaButton id="benefits" msg={MSG.default}>Pedir orçamento agora</WaButton></div></Reveal>
      </div>
    </section>
  );
}

function Videos({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="videos" className="grain relative overflow-hidden bg-black py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-7xl px-5">
        <Reveal><p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#feaa2e]">Cinco vídeos, a loja de verdade</p></Reveal>
        <Reveal delay={0.1}><h2 className="max-w-4xl font-display text-6xl md:text-8xl">Veja o balcão <span className="text-[#feaa2e]">por dentro</span></h2></Reveal>
        <Reveal delay={0.15}><p className="mt-5 max-w-xl text-white/70">Toque em um vídeo para assistir com som. Nada baixa até você escolher.</p></Reveal>
      </div>
      <div className="relative mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-10 md:mx-auto md:max-w-7xl md:snap-none md:overflow-visible md:pb-16 [scrollbar-width:none]">
        {VIDEOS.map((v, i) => (
          <motion.button key={v.src} data-testid={`button-video-${i}`} onClick={() => onOpen(i)} aria-label={`Assistir: ${v.title}`}
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative aspect-[9/16] w-[64vw] shrink-0 snap-center overflow-hidden rounded-3xl text-left md:w-auto md:flex-1 ${i % 2 ? "md:mt-14" : ""}`}>
            <img src={v.poster} alt={v.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-[#feaa2e] px-3 py-1 text-xs font-bold text-black">{v.tag}</span>
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#feaa2e] text-black transition-transform duration-300 group-hover:scale-125"><Play className="ml-1 h-7 w-7 fill-current" /></span>
            <span className="absolute inset-x-0 bottom-0 p-4 font-display text-2xl leading-none">{v.title}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

const SERV = [
  { k: "chaves", icon: KeyRound, title: "Chaves", items: ["Cópia de chave", "Troca de segredo", "Chave de carro: cópia e programação"], msg: MSG.copia },
  { k: "portas", icon: DoorOpen, title: "Portas e fechaduras", items: ["Modelagem e abertura de portas", "Instalação de fechaduras"], msg: MSG.porta },
  { k: "cofres", icon: Lock, title: "Cofres", items: ["Abertura de cofres, com cuidado e atendimento reservado"], msg: MSG.cofre },
  { k: "extras", icon: Watch, title: "Extras", items: ["Conserto de relógios", "Ajuste de pulseira", "Troca de bateria e pino", "Afiação de tesouras e alicates", "Carimbos personalizados"], msg: MSG.extras },
];
function Services() {
  const [a, setA] = useState(0);
  const s = SERV[a];
  const Icon = s.icon;
  return (
    <section id="servicos" className="bg-[#feaa2e] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal><h2 className="font-display text-6xl md:text-8xl">O que você pode pedir</h2></Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
          <div role="tablist" className="flex gap-2 overflow-x-auto lg:flex-col [scrollbar-width:none]">
            {SERV.map((x, i) => (
              <button key={x.k} role="tab" aria-selected={a === i} data-testid={`tab-service-${x.k}`} onClick={() => setA(i)} className={`flex shrink-0 items-center gap-3 rounded-2xl px-5 py-4 text-left font-display text-2xl transition-all duration-300 ${a === i ? "bg-black text-[#feaa2e] lg:translate-x-3" : "bg-black/10 hover:bg-black/20"}`}>
                <x.icon className="h-6 w-6" />{x.title}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={s.k} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="relative overflow-hidden rounded-3xl bg-black p-8 text-white md:p-12">
              <Icon className="absolute -right-8 -top-8 h-56 w-56 text-white/5" />
              <h3 className="font-display text-5xl text-[#feaa2e]">{s.title}</h3>
              <ul className="mt-8 space-y-3">
                {s.items.map((it, i) => (
                  <motion.li key={it} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }} className="flex items-center gap-3 border-b border-white/10 pb-3 text-lg"><span className="h-2 w-2 rotate-45 bg-[#feaa2e]" />{it}</motion.li>
                ))}
              </ul>
              <WaButton id={`service-${s.k}`} msg={s.msg} className="relative mt-9">Orçamento de {s.title.toLowerCase()}</WaButton>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[["01", "Chame no WhatsApp", "Diga o que precisa e, se for chave de carro, o modelo e o ano."], ["02", "Receba o orçamento", "Valor claro, sem compromisso. Pagamento em Pix ou cartão."], ["03", "Atendimento no Shopping JK", "Você leva a chave ou o item e a gente resolve no balcão."]].map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.12}>
              <div className="h-full rounded-3xl bg-white p-7"><p className="font-display text-7xl text-[#feaa2e] [-webkit-text-stroke:2px_#000]">{n}</p><h3 className="mt-3 font-display text-3xl">{t}</h3><p className="mt-2 text-black/70">{d}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarKey() {
  return (
    <section className="overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <Parallax amount={30}>
            <div className="relative mx-auto aspect-[420/700] w-full max-w-sm overflow-hidden rounded-3xl bg-[#feaa2e] shadow-2xl">
              <img data-testid="img-car-key" src={IMG.ad} alt="Chave de carro com botões de abertura" loading="lazy" className="absolute left-0 max-w-none" style={{ width: "217.9%", top: "-21.4%" }} />
            </div>
          </Parallax>
        </Reveal>
        <div>
          <Reveal><h2 className="font-display text-6xl md:text-8xl">Chave de carro sem depender da <span className="bg-black px-2 text-[#feaa2e]">concessionária</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-lg text-lg text-black/70">Fazemos cópia e programação de chaves de carro na própria loja. Mande o modelo e o ano no WhatsApp e a gente confirma se atende o seu caso.</p></Reveal>
          <Reveal delay={0.2}><div className="mt-8"><WaButton id="car" msg={MSG.carro}>Orçamento de chave de carro</WaButton></div></Reveal>
          <Reveal delay={0.3}><p className="mt-8 border-l-4 border-[#feaa2e] pl-4 font-semibold">O custo de continuar sem resolver: uma única cópia da chave é um risco diário. Perdeu, quebrou ou alguém mais ficou com ela, e você pode ficar do lado de fora.</p></Reveal>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  ["Vocês fazem cópia de chave de carro?", "Sim. Fazemos cópia e programação de chaves de carro na loja. Informe modelo e ano no WhatsApp."],
  ["Troca de segredo serve pra quê?", "Aumenta a segurança da fechadura. A chave antiga deixa de abrir, útil quando você perdeu a chave ou mudou de imóvel."],
  ["Vocês abrem portas e cofres?", "Sim. Fazemos modelagem e abertura de portas e abertura de cofres."],
  ["Como peço o orçamento?", "Pelo WhatsApp. Você descreve o serviço e recebemos para passar o valor, antes de qualquer serviço e sem compromisso."],
  ["Quais as formas de pagamento?", "Pix e cartão."],
  ["Onde fica a loja?", `${ADDRESS}.`],
  ["Fazem outros serviços além de chave?", "Sim: conserto de relógio, ajuste de pulseira, troca de bateria e pino, afiação de tesoura e alicate e carimbos personalizados."],
  ["É seguro entregar minha chave ou minha porta pra vocês?", "É uma preocupação válida. São mais de 40 anos de atividade, com atendimento personalizado e reservado."],
  ["Vai ser caro?", "Por isso o orçamento vem antes. Você descreve o serviço, vê o valor e decide, sem compromisso."],
];
function Faq() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-[#f6f3ee] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.4fr]">
        <div><Reveal><h2 className="font-display text-6xl md:text-8xl">Dúvidas <span className="bg-[#feaa2e] px-2">comuns</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-black/65">Não achou a sua? Pergunte direto no WhatsApp.</p><div className="mt-6"><WaButton id="faq" msg={MSG.default} dark>Tirar dúvida</WaButton></div></Reveal></div>
        <div className="space-y-3">
          {FAQ.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.04} y={20}>
              <div className={`overflow-hidden rounded-2xl bg-white transition-shadow ${o === i ? "shadow-xl" : ""}`}>
                <button data-testid={`button-faq-${i}`} aria-expanded={o === i} onClick={() => setO(o === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg font-bold">
                  {q}<span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${o === i ? "rotate-180 bg-[#feaa2e]" : "bg-black text-white"}`}><ChevronDown className="h-5 w-5" /></span>
                </button>
                <AnimatePresence initial={false}>
                  {o === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}><p className="px-5 pb-5 text-black/70">{a}</p></motion.div>}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Local() {
  return (
    <section id="loja" className="bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal><h2 className="font-display text-6xl md:text-8xl">Venha até o <span className="text-[#feaa2e]">balcão</span></h2></Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl">
              <img data-testid="img-store" src={IMG.store} alt="Fachada da loja DF Chaveiro no Shopping JK" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="flex items-start gap-2 text-lg font-semibold"><MapPin className="mt-1 h-5 w-5 shrink-0 text-[#feaa2e]" /><span data-testid="text-address">{ADDRESS}</span></p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a data-testid="link-directions" href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="btn-y inline-flex items-center gap-2 rounded-full bg-[#feaa2e] px-6 py-3 font-bold text-black transition-transform hover:-translate-y-1"><Navigation className="h-4 w-4" />Como chegar</a>
                  <WaButton id="local" msg={MSG.default} className="!bg-white !py-3">Chamar no WhatsApp</WaButton>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <iframe data-testid="map-embed" title="Mapa da DF Chaveiro JK no Shopping JK" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[420px] w-full rounded-3xl border-0 grayscale-[.3] lg:h-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Final() {
  return (
    <section className="grain relative isolate overflow-hidden bg-black py-28 text-center text-white md:py-40">
      <LazyLoopVideo testid="video-final" src={VIDEOS[2].src} poster={VIDEOS[2].poster} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="mx-auto max-w-5xl px-5">
        <Reveal><h2 className="font-display text-6xl md:text-9xl">Porta travada, chave perdida ou cópia pra fazer?</h2></Reveal>
        <Reveal delay={0.1}><p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">Tire isso da sua lista hoje. São mais de 40 anos de experiência, a uma mensagem de distância.</p></Reveal>
        <Reveal delay={0.2}><div className="mt-10"><WaButton id="final" msg={MSG.default} className="pulse-ring !px-10 !py-5 text-xl !bg-[#feaa2e]">Pedir orçamento agora</WaButton></div></Reveal>
        <Reveal delay={0.3}><p className="mt-5 text-sm text-white/60">Orçamento sem compromisso · Pix e cartão · Shopping JK</p></Reveal>
        <Reveal delay={0.35}><p className="mx-auto mt-14 max-w-2xl border-t border-white/15 pt-6 text-sm text-white/60">P.S.: Se você só tem uma cópia da chave de casa ou do carro, faça outra antes que ela falte. E se já precisa de ajuda agora, chame a DF Chaveiro JK no WhatsApp.</p></Reveal>
      </div>
    </section>
  );
}

function Footer({ onPrivacy }: { onPrivacy: () => void }) {
  return (
    <footer className="bg-[#feaa2e] pb-28 pt-12 text-black md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between">
        <div>
          <img src={IMG.logo} alt="DF Chaveiro, desde 1985" className="h-20 w-auto rounded-xl bg-white px-3" />
          <p className="mt-4 font-semibold">{ADDRESS}</p>
          <p className="text-sm">WhatsApp +55 (61) 99675-7995</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
          {LINKS.map(([l, h]) => <a key={h} href={h} className="hover:underline">{l}</a>)}
          <button data-testid="link-privacy" onClick={onPrivacy} className="underline">Política de privacidade</button>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl px-5 text-xs">© {new Date().getFullYear()} DF Chaveiro JK. Chaveiro no Shopping JK desde 1985.</p>
    </footer>
  );
}

function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 500);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a data-testid="button-whatsapp-floating" href={wa(MSG.default)} target="_blank" rel="noopener noreferrer" aria-label="Pedir orçamento no WhatsApp" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1.08 }} className="pulse-ring fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-4 font-bold text-black shadow-2xl">
          <FaWhatsapp className="h-6 w-6" /><span className="hidden sm:inline">Pedir orçamento</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [vid, setVid] = useState<number | null>(null);
  const [priv, setPriv] = useState(false);
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <main className="min-h-[100dvh]">
      <motion.div style={{ scaleX: sx, backgroundColor: Y }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left" />
      <Nav />
      <Hero />
      <Marquee />
      <Trust />
      <Pain />
      <Solution />
      <Benefits />
      <Marquee dark />
      <Videos onOpen={setVid} />
      <Services />
      <CarKey />
      <Faq />
      <Local />
      <Final />
      <Footer onPrivacy={() => setPriv(true)} />
      <Floating />
      <VideoModal index={vid} onClose={() => setVid(null)} onChange={setVid} />
      <Privacy open={priv} onClose={() => setPriv(false)} />
    </main>
  );
}
