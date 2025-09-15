import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/AppWrapper/AppWrapper.tsx";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById('root')!)

try {
  root.render(<StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </StrictMode>)
} catch (e) {
  console.error(e)
}
