
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('Service Worker registrato con successo.');
      })
      .catch((err) => {
        console.warn('Registrazione Service Worker fallita:', err);
      });
  });
}


  createRoot(document.getElementById("root")!).render(<App />);
  