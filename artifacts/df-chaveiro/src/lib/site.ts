const B = import.meta.env.BASE_URL;
export const m = (f: string) => `${B}media/${f}`;
export const PHONE = "556196757995";
export const wa = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
export const MSG = {
  default: "Olá, vim pelo site da DF Chaveiro JK e gostaria de um orçamento.",
  copia: "Olá, vim pelo site da DF Chaveiro JK e gostaria de um orçamento para cópia de chave.",
  carro: "Olá, vim pelo site da DF Chaveiro JK e gostaria de um orçamento de chave de carro. Modelo e ano: ",
  porta: "Olá, vim pelo site da DF Chaveiro JK e preciso de ajuda com uma porta ou fechadura.",
  cofre: "Olá, vim pelo site da DF Chaveiro JK e gostaria de um orçamento para abertura de cofre.",
  extras: "Olá, vim pelo site da DF Chaveiro JK e gostaria de um orçamento de um serviço extra (relógio, afiação ou carimbo).",
};
export const ADDRESS = "Av. Hélio Prates, QNM 34, Área Especial 01, M Norte, Shopping JK";
export const MAP_Q = encodeURIComponent("Shopping JK, Av. Hélio Prates, QNM 34, Área Especial 01, M Norte, Brasília");
export const MAP_EMBED = `https://www.google.com/maps?q=${MAP_Q}&output=embed`;
export const MAP_LINK = `https://www.google.com/maps/dir/?api=1&destination=${MAP_Q}`;
export const IMG = {
  logo: m("logo-crop.png"),
  keys: m("IMG01_1791320592004.jpg"),
  store: m("IMG02_1791320592005.jpg"),
  ad: m("IMG03_1791320592005.jpg"),
};
export const VIDEOS = [
  { src: m("Video01_1791320592006.mp4"), poster: m("Video01_1791320592006.jpg"), title: "A loja no Shopping JK", tag: "Onde fica" },
  { src: m("Video02_1791320592007.mp4"), poster: m("Video02_1791320592007.jpg"), title: "A máquina de cópia em ação", tag: "Cópia de chave" },
  { src: m("Video03_1791320592007.mp4"), poster: m("Video03_1791320592007.jpg"), title: "Nossa marca, desde 1985", tag: "A casa" },
  { src: m("Video04_1791320592008.mp4"), poster: m("Video04_1791320592008.jpg"), title: "Na bancada de reparos", tag: "Além da chave" },
  { src: m("Video05_1791320592008.mp4"), poster: m("Video05_1791320592008.jpg"), title: "Quem atende você, direto no balcão", tag: "Atendimento" },
];
