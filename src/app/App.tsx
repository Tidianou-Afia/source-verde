import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { SiteSettingsProvider } from "./context/site-settings";
import { CatalogProvider } from "./context/catalog";

export default function App() {
  return (
    <SiteSettingsProvider>
      <CatalogProvider>
        <RouterProvider router={router} />
        <Toaster richColors closeButton />
      </CatalogProvider>
    </SiteSettingsProvider>
  );
}
