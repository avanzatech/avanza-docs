import { Navigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";

// /docs/:lang/os -> send to blueprint picker
export function OsIndex() {
  const { lang } = usePreferences();
  return <Navigate to={`/docs/${lang}/os/pick`} replace />;
}

type Props = { product: "os" | "impulse"; section?: "kitchen" };
export default function DocsIndex({ product, section }: Props) {
  const { lang } = usePreferences();
  const base =
    section === "kitchen"
      ? `/docs/${lang}/os/restaurant/kitchen-portal`
      : product === "os"
      ? `/docs/${lang}/os/restaurant`
      : `/docs/${lang}/impulse`;
  const firstSlug = section === "kitchen" ? "kitchen-home" : "getting-started";
  return <Navigate to={`${base}/${firstSlug}`} replace />;
}
