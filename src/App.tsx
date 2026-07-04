import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { PreferencesProvider } from "./lib/LanguageContext";
import Landing from "./pages/Landing";
import BlueprintPicker from "./pages/BlueprintPicker";
import DocsIndex, { OsIndex } from "./pages/DocsIndex";
import DocsArticle from "./pages/DocsArticle";

// Redirects legacy /kitchen-portal/:slug links into the unified restaurant nav,
// where kitchen pages now live as a grouped sub-section.
function KitchenRedirect() {
  const { lang, slug } = useParams();
  return <Navigate to={`/docs/${lang}/os/restaurant/${slug}`} replace />;
}

export default function App() {
  return (
    <PreferencesProvider>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Avanza OS: language -> blueprint -> docs */}
        <Route path="/docs/:lang/os" element={<OsIndex />} />
        <Route path="/docs/:lang/os/pick" element={<BlueprintPicker />} />
        <Route path="/docs/:lang/os/restaurant" element={<DocsIndex product="os" />} />
        <Route path="/docs/:lang/os/restaurant/:slug" element={<DocsArticle product="os" />} />

        {/* Legacy Kitchen Portal paths → redirect into the unified restaurant nav */}
        <Route path="/docs/:lang/os/restaurant/kitchen-portal" element={<Navigate to="kitchen-home" replace />} />
        <Route path="/docs/:lang/os/restaurant/kitchen-portal/:slug" element={<KitchenRedirect />} />

        {/* Avanza Impulse: language -> docs (no blueprint layer) */}
        <Route path="/docs/:lang/impulse" element={<DocsIndex product="impulse" />} />
        <Route path="/docs/:lang/impulse/:slug" element={<DocsArticle product="impulse" />} />
      </Routes>
    </PreferencesProvider>
  );
}
