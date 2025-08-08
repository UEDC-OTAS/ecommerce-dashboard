import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { Suspense } from "react";
import { NumberProvider } from "./context/NumberContext";

createRoot(document.getElementById("root")).render(
  <Suspense>
    {/* <MobileBlocker> */}
    <NumberProvider>
      <App />
    </NumberProvider>
    {/* </MobileBlocker> */}
  </Suspense>
);
