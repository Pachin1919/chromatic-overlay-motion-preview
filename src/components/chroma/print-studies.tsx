import { asset } from "@/lib/asset";
import { useLanguage } from "./language-context";
import { artCopy } from "@/lib/art-round2-copy";

const root = asset("assets/chroma/round2/");

export function FoldStudy({ sheets = false }: { sheets?: boolean }) {
  const { language } = useLanguage();
  const a = artCopy[language];
  return <section className={`fold-study section-pad section-rule ${sheets ? "sheet-study" : ""}`}>
    <figure><img src={root + (sheets ? "edition-sheets.jpg" : "accordion-proof.jpg")} loading="lazy" decoding="async" width={sheets ? 928 : 1264} height={sheets ? 1152 : 848} alt={sheets ? a.sheetsAlt : a.foldAlt} /><figcaption>{sheets ? a.sheetsCaption : a.foldCaption}</figcaption></figure>
    <div className="fold-text"><h2>{a.foldTitle}</h2><p>{a.foldBody}</p></div>
  </section>;
}

export function SilverContact() {
  const { language, t } = useLanguage();
  const a = artCopy[language];
  return <section className="silver-contact section-pad section-rule">
    <header><p className="section-label">{t.home.silverLabel}</p><h2>{t.home.silverTitle}</h2><p>{t.home.silverBody}</p></header>
    <div className="contact-images">
      <figure className="contact-full"><img src={asset("assets/chroma/silver-current.png")} loading="lazy" width={1672} height={941} alt={language === "zh" ? "《流动之一》的完整银调构图" : "Complete Silver composition of Current One"} /><figcaption>{t.home.silverLabel}</figcaption></figure>
      <figure><img src={root + "silver-crest.png"} loading="lazy" width={900} height={470} alt={a.crestAlt} /><figcaption>{a.crest}</figcaption></figure>
      <figure><img src={root + "silver-depth.png"} loading="lazy" width={650} height={611} alt={a.depthAlt} /><figcaption>{a.depth}</figcaption></figure>
    </div>
  </section>;
}

export function MaterialStudy() {
  const { language } = useLanguage();
  const a = artCopy[language];
  return <section className="material-study section-pad">
    <p className="section-label">{a.colophon}</p>
    <div className="material-grid"><figure className="material-macro"><img src={root + "paper-fibre.jpg"} loading="lazy" width={1536} height={1024} alt={a.materialAlt} /><figcaption>{a.materialCaption}</figcaption></figure>
      <div className="material-text"><h2>{a.materialTitle}</h2><p>{a.materialBody}</p><figure><img src={root + "chromatic-grain.png"} loading="lazy" width={600} height={600} alt={a.grainAlt} /><figcaption>{a.grain}</figcaption></figure></div>
    </div>
  </section>;
}