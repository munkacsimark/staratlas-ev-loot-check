import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const umamiWebsiteId: string = import.meta.env.VITE_UMAMI_WEBSITE_ID;
if (umamiWebsiteId) {
  const umamiScript = document.createElement("script");
  umamiScript.src = "https://analytics.umami.is/script.js";
  umamiScript.async = true;
  umamiScript.setAttribute("data-website-id", umamiWebsiteId);
  document.head.appendChild(umamiScript);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
