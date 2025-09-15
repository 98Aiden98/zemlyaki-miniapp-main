import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as routes from "./lib/routes";
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/profilePage";
import ChatsPage from "./pages/chatsPage";
import MembersPage from "./pages/membersPage";
import MemberProfilePage from "./pages/memberProfilePage";
import { useEffect } from "react";
import { init } from "./lib/telegram";

function App() {
useEffect(() => {
  init()
})
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.getMainPage()} element={<MainPage />} />
        <Route path={routes.getProfilePage()} element={<ProfilePage />}/>
        <Route path={routes.getChatsPage()} element={<ChatsPage />} />
        <Route path={routes.getMembersPage()} element={<MembersPage />} />
        <Route path={routes.getMemberProfilePage(routes.editMemberRouteParams)} element={<MemberProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
