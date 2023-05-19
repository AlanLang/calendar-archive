import { createRoot } from "react-dom/client";
import React from "react";
import { App } from "./App";
import "./index.css";

const appDom = document.getElementById("app");
if (appDom) {
  const root = createRoot(appDom);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
