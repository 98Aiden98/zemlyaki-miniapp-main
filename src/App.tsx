import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as routes from "./lib/routes";
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/profilePage";
import ChatsPage from "./pages/chatsPage";
import MembersPage from "./pages/membersPage";
import MemberProfilePage from "./pages/memberProfilePage";
import { useEffect, useRef } from "react";
import { init } from "./lib/telegram";
import { backButton } from "@telegram-apps/sdk-react";

function App() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      try {
        init();
        isInitialized.current = true;
      } catch (error) {
        console.error("Failed to initialize Telegram SDK:", error);
      }
    }

    return () => {
      if (isInitialized.current && backButton.isMounted()) {
        backButton.unmount();
      }
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.getMainPage()} element={<MainPage />} />
        <Route path={routes.getProfilePage()} element={<ProfilePage />} />
        <Route path={routes.getChatsPage()} element={<ChatsPage />} />
        <Route path={routes.getMembersPage()} element={<MembersPage />} />
        <Route
          path="/member/:userId"
          element={<MemberProfilePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
