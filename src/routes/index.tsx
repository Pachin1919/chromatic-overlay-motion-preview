import { asset } from "@/lib/asset";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealArtwork } from "@/components/chroma/reveal-artwork";
import { useLanguage } from "@/components/chroma/language-context";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "CHROMA — Art Editions" },
    { name: "description", content: "CHROMA presents Current One: two aligned readings of one visual current in chromatic and silver states." },
    { property: "og:title", content: "CHROMA — Art Editions" },
    { property: "og:description", content: "Two readings of one current: an interactive art-edition study in colour and tone." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

function HomePage() {
  const { t } = useLanguage();
  return <>
    <section className="cover" aria-labelledby="cover-title">
      <RevealArtwork className="cover-art" />
      <div className="cover-copy">
        <p className="cover-kicker">{t.home.kicker}</p>
        <h1 id="cover-title">{t.home.title}</h1>
        <p className="cover-subtitle">{t.home.subtitle}</p>
      </div>
      <p className="cover-instruction">{t.home.instruction}</p>
      <ArrowDownRight className="cover-arrow" aria-hidden="true" />
    </section>

    <section className="editorial-intro section-pad">
      <p className="section-label">{t.home.introLabel}</p>
      <div>
        <h2>{t.home.introTitle}</h2>
        <p className="lead-copy">{t.home.introBody}</p>
        <Button asChild variant="editorial"><Link to="/editions/current-one">{t.common.viewEdition}<ArrowUpRight /></Link></Button>
      </div>
    </section>

    <section className="image-spread section-pad section-rule">
      <figure className="spread-image spread-image-wide">
        <img src={asset("/assets/chroma/chromatic-current.png")} alt="Chromatic Current One composition in cyan, violet and coral against midnight blue" />
        <figcaption>{t.home.spreadLabel}</figcaption>
      </figure>
      <div className="spread-copy"><span>01</span><h2>{t.home.spreadTitle}</h2><p>{t.home.spreadBody}</p></div>
    </section>

    <section className="image-spread silver-spread section-pad section-rule">
      <div className="spread-copy"><span>02</span><h2>{t.home.silverTitle}</h2><p>{t.home.silverBody}</p></div>
      <figure className="spread-image">
        <img src={asset("/assets/chroma/silver-current.png")} alt="Silver Current One composition showing tonal structure" />
        <figcaption>{t.home.silverLabel}</figcaption>
      </figure>
    </section>

    <section className="closing-band section-pad">
      <p>CHROMA / 01</p><h2>{t.home.closing}</h2>
      <Button asChild variant="editorial"><Link to="/editions/current-one">{t.common.compare}<ArrowUpRight /></Link></Button>
    </section>
  </>;
}