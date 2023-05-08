import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import { App } from "./AppNew";

const appDom = document.getElementById("app");
if (appDom) {
  const root = createRoot(appDom);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
