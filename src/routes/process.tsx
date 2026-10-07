import { asset } from "@/lib/asset";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/chroma/language-context";

export const Route = createFileRoute("/process")({
  head: () => ({ meta: [
    { title: "Process — CHROMA Art Editions" },
    { name: "description", content: "How CHROMA translates one aligned composition between chromatic and silver visual languages." },
    { property: "og:title", content: "Process — CHROMA Art Editions" },
    { property: "og:description", content: "Composition, media translation, reveal and publication in Current One." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ProcessPage,
});

function ProcessPage() {
  const { t } = useLanguage();
  return <div className="page-shell process-page">
    <header className="process-title section-pad"><p className="eyebrow">{t.process.eyebrow}</p><h1>{t.process.title}</h1><p>{t.process.intro}</p></header>
    <figure className="process-plate"><div><img src={asset("/assets/chroma/chromatic-current.png")} alt="Chromatic Current One composition" /><span>CHROMATIC</span></div><div><img src={asset("/assets/chroma/silver-current.png")} alt="Silver Current One composition" /><span>SILVER</span></div></figure>
    <section className="process-steps section-pad">{t.process.steps.map(([number, title, body]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{body}</p></article>)}</section>
    <section className="colophon section-pad section-rule"><p>Colophon</p><div><p>{t.process.colophon}</p><Button asChild variant="editorial"><Link to="/editions/current-one">{t.common.compare}<ArrowUpRight /></Link></Button></div></section>
  </div>;
}