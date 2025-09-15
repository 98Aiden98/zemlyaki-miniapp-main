import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import * as routes from "./lib/routes";
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/profilePage";
import ChatsPage from "./pages/chatsPage";
import MembersPage from "./pages/membersPage";
import MemberProfilePage from "./pages/memberProfilePage";
import { useEffect, useRef, useState } from "react";
import { init } from "./lib/telegram";
import { backButton } from "@telegram-apps/sdk-react";
import LoadingPage from "./pages/LoadingPage";

const BackButtonHandler = () => {
  const navigate = useNavigate();
  const isBackButtonMounted = useRef(false);

  useEffect(() => {
    if (backButton.isSupported() && !isBackButtonMounted.current) {
      backButton.mount();
      isBackButtonMounted.current = true;

      backButton.onClick(() => {
        navigate(-1); // Navigate back in history
      });

      const handleRouteChange = () => {
        if (window.location.pathname === "/") {
          backButton.hide();
        } else {
          backButton.show();
        }
      };

      handleRouteChange();
      window.addEventListener("popstate", handleRouteChange);

      return () => {
        window.removeEventListener("popstate", handleRouteChange);
        if (isBackButtonMounted.current) {
          backButton.unmount();
          isBackButtonMounted.current = false;
        }
      };
    }
  }, [navigate]);

  return null;
};

function App() {
  const isInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isInitialized.current) {
      try {
        setIsLoading(true);
        init();
        isInitialized.current = true;
        setIsLoading(false);
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
    isLoading ? (
      <LoadingPage/>
    ) :
    <BrowserRouter>
      <BackButtonHandler />
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
