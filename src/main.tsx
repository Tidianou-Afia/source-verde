
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {
      // Ignore SW registration failures in development or unsupported browsers.
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
  
