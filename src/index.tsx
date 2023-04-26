import { createRoot } from "react-dom/client";
import { sum } from "./demo";
import React from "react";

function App() {
  return <div>{sum(1, 2)}</div>;
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
