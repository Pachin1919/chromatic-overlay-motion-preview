import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RevealArtwork } from "@/components/chroma/reveal-artwork";
import { useLanguage } from "@/components/chroma/language-context";

export const Route = createFileRoute("/editions/current-one")({
  head: () => ({ meta: [
    { title: "Current One — Edition Detail | CHROMA" },
    { name: "description", content: "Compare Chromatic and Silver states of Current One and inspect the edition design notes and credits." },
    { property: "og:title", content: "Current One — Edition Detail | CHROMA" },
    { property: "og:description", content: "A close reading of one composition across chromatic energy and silver structure." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: EditionDetail,
});

function EditionDetail() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"compare" | "chromatic" | "silver">("compare");
  return <div className="page-shell detail-page">
    <header className="detail-title section-pad"><Link to="/editions" className="back-link"><ArrowLeft />{t.common.back}</Link><p className="eyebrow">{t.detail.eyebrow}</p><h1>{t.detail.title}</h1><p>{t.detail.dek}</p></header>
    <section className="detail-viewer section-pad section-rule">
      <div className="viewer-top"><div><p className="section-label">{t.detail.viewerTitle}</p><p>{t.detail.viewerBody}</p></div><div className="state-selector" aria-label={t.detail.selector}>
        {(["compare", "chromatic", "silver"] as const).map((value) => <Button key={value} variant={mode === value ? "default" : "outline"} aria-pressed={mode === value} onClick={() => setMode(value)}>{value === "compare" ? t.detail.compareMode : value === "chromatic" ? t.common.chromatic : t.common.silver}</Button>)}
      </div></div>
      <RevealArtwork mode={mode} onModeChange={setMode} />
    </section>
    <section className="format-notes section-pad section-rule"><h2>{t.detail.notesTitle}</h2><dl>{t.detail.notes.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl></section>
    <section className="credits section-pad section-rule"><p className="section-label">{t.detail.creditsTitle}</p><p>{t.detail.creditsBody}</p></section>
  </div>;
}