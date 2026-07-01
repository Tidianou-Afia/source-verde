import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Cgv } from "./pages/Cgv";
import { LegalNotice } from "./pages/LegalNotice";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Layout } from "./components/Layout";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/admin",
    Component: Admin,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "produits", Component: Products },
      { path: "produits/:category", Component: Products },
      { path: "a-propos", Component: About },
      { path: "contact", Component: Contact },
      { path: "cgv", Component: Cgv },
      { path: "mentions-legales", Component: LegalNotice },
      { path: "politique-confidentialite", Component: PrivacyPolicy },
    ],
  },
]);
