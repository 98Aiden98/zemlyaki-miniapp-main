import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getChatsPage, getMainPage, getProfilePage } from "./lib/routes";
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/profilePage";
import ChatsPage from "./pages/chatsPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={getMainPage()} element={<MainPage />} />
        <Route path={getProfilePage()} element={<ProfilePage />}/>
        <Route path={getChatsPage()} element={<ChatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
