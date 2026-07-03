import { Navigate } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";

// /docs/:lang/os -> send to blueprint picker
export function OsIndex() {
  const { lang } = useLanguage();
  return <Navigate to={`/docs/${lang}/os/pick`} replace />;
}

// /docs/:lang/os/restaurant -> first article
// /docs/:lang/impulse -> first article
type Props = { product: "os" | "impulse" };
export default function DocsIndex({ product }: Props) {
  const { lang } = useLanguage();
  const base = product === "os" ? `/docs/${lang}/os/restaurant` : `/docs/${lang}/impulse`;
  return <Navigate to={`${base}/getting-started`} replace />;
}
