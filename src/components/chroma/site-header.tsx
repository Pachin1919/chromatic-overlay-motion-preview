import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";

export function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="CHROMA home">CHROMA</Link>
      <nav className="site-nav" aria-label={language === "zh" ? "主导航" : "Primary navigation"}>
        <Link to="/editions" activeProps={{ "data-current": "true" }}>{t.nav.editions}</Link>
        <Link to="/process" activeProps={{ "data-current": "true" }}>{t.nav.process}</Link>
        <Button variant="language" size="sm" onClick={() => setLanguage(language === "en" ? "zh" : "en")} aria-label={language === "en" ? "切换至中文" : "Switch to English"}>
          {t.nav.language}
        </Button>
      </nav>
    </header>
  );
}