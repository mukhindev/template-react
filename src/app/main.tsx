import { createRoot } from "react-dom/client";
import App from "~/app/App";
import "./variables.scss";
import "./main.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw Error("Root element not found in DOM");
}

const root = createRoot(rootElement);

root.render(<App />);
