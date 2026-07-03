import { Routes, Route } from "react-router-dom";
import { PreferencesProvider } from "./lib/LanguageContext";
import Landing from "./pages/Landing";
import BlueprintPicker from "./pages/BlueprintPicker";
import DocsIndex, { OsIndex } from "./pages/DocsIndex";
import DocsArticle from "./pages/DocsArticle";

export default function App() {
  return (
    <PreferencesProvider>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Avanza OS: language -> blueprint -> docs */}
        <Route path="/docs/:lang/os" element={<OsIndex />} />
        <Route path="/docs/:lang/os/pick" element={<BlueprintPicker />} />
        <Route path="/docs/:lang/os/restaurant" element={<DocsIndex product="os" />} />
        <Route path="/docs/:lang/os/restaurant/:slug" element={<DocsArticle product="os" section="os" />} />

        {/* Kitchen Portal — nested under OS/Restaurant, own nav + banner */}
        <Route path="/docs/:lang/os/restaurant/kitchen-portal" element={<DocsIndex product="os" section="kitchen" />} />
        <Route path="/docs/:lang/os/restaurant/kitchen-portal/:slug" element={<DocsArticle product="os" section="kitchen" />} />

        {/* Avanza Impulse: language -> docs (no blueprint layer) */}
        <Route path="/docs/:lang/impulse" element={<DocsIndex product="impulse" />} />
        <Route path="/docs/:lang/impulse/:slug" element={<DocsArticle product="impulse" />} />
      </Routes>
    </PreferencesProvider>
  );
}
