import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { Suspense } from "react";

createRoot(document.getElementById("root")).render(
  <Suspense>
    {/* <MobileBlocker> */}
    <App />
    {/* </MobileBlocker> */}
  </Suspense>
);
