import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "produits", Component: Products },
      { path: "produits/:category", Component: Products },
      { path: "a-propos", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
]);
