import { init, useLaunchParams } from "@telegram-apps/sdk-react";
import type { TelegramUser } from "../types/telegram";


export const initTelegram = () => {
  try {
    init();
  } catch {
    console.warn("Can't initialize tma, skipping...");
  }
};

export const GetUser = (): TelegramUser => {
    const launchParams = useLaunchParams();
  if (launchParams && launchParams.tgWebAppData?.user) {
    const { id, first_name, last_name, username, photo_url } = launchParams.tgWebAppData.user;
    return {
      id,
      first_name,
      last_name,
      username,
      photo_url: photo_url || "https://via.placeholder.com/40",
      name: `${first_name || ""} ${last_name || ""}`.trim() || "Guest",
    };
  }
  return {
    name: "Guest",
    photo_url: "https://via.placeholder.com/40",
  };
};
