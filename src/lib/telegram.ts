
import type { TelegramUser } from "../types/telegram";
import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  init as initSDK,
  useLaunchParams
} from '@telegram-apps/sdk-react'

export function init(): void {

  initSDK()

  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error('ERR_NOT_SUPPORTED')
  }

  backButton.mount()
  miniApp.mount()
  themeParams.mount()
  initData.restore()
  void viewport
    .mount()
    .catch(e => {
      console.error('Something went wrong mounting the viewport', e)
    })
    .then(() => {
      viewport.bindCssVars()
    })

  miniApp.bindCssVars()
  themeParams.bindCssVars()
}

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
