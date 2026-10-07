import { asset } from "@/lib/asset";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/chroma/language-context";
import { FoldStudy, SilverContact } from "@/components/chroma/print-studies";

export const Route = createFileRoute("/editions/")({
  head: () => ({ meta: [
    { title: "Current One — CHROMA Editions" },
    { name: "description", content: "Explore the paired Chromatic and Silver readings that form CHROMA Current One." },
    { property: "og:title", content: "Current One — CHROMA Editions" },
    { property: "og:description", content: "A paired visual publication studying one composition through colour and tone." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: EditionsPage,
});

function EditionsPage() {
  const { t } = useLanguage();
  return <div className="page-shell">
    <header className="page-title section-pad"><p className="eyebrow">{t.editions.eyebrow}</p><h1>{t.editions.title}</h1><p>{t.editions.dek}</p></header>
    <section className="edition-pair section-pad section-rule">
      <article><figure><img src={asset("assets/chroma/chromatic-current.png")} loading="lazy" width={1672} height={941} alt={t.editions.chromaticBody} /><figcaption>01 — {t.common.chromatic}</figcaption></figure><p>{t.editions.chromaticBody}</p></article>
      <article><figure><img src={asset("assets/chroma/silver-current.png")} loading="lazy" width={1672} height={941} alt={t.editions.silverBody} /><figcaption>02 — {t.common.silver}</figcaption></figure><p>{t.editions.silverBody}</p></article>
    </section>
    <SilverContact />
    <FoldStudy sheets />
    <section className="edition-note section-pad section-rule"><p>01 / 01</p><div><h2>{t.editions.noteTitle}</h2><p>{t.editions.noteBody}</p><Button asChild variant="editorial"><Link to="/editions/current-one">{t.common.viewEdition}<ArrowUpRight /></Link></Button></div></section>
  </div>;
}