import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getMainPage, getProfilePage } from "./lib/routes";
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/profilePage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={getMainPage()} element={<MainPage />} />
        <Route path={getProfilePage()} element={<ProfilePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
