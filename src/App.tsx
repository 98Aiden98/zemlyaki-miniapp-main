import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {getMainPage} from "./lib/routes";
import MainPage from "./pages/mainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={getMainPage()} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
