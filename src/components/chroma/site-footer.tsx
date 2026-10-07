import { Link } from "@tanstack/react-router";
import { useLanguage } from "./language-context";

export function SiteFooter() {
  const { language, t } = useLanguage();
  return (
    <footer className="site-footer">
      <p>CHROMA — {t.common.concept}</p>
      <nav aria-label={language === "zh" ? "页脚导航" : "Footer navigation"}>
        <Link to="/editions">{t.nav.editions}</Link>
        <Link to="/process">{t.nav.process}</Link>
      </nav>
      <p>Original visual study © PACHIN</p>
    </footer>
  );
}