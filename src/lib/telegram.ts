
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
    id: 0,
    name: "Guest",
    photo_url: "https://via.placeholder.com/40",
  };
};

const BOT_TOKEN = process.env.VITE_APP_TELEGRAM_BOT_TOKEN || "not_set";

export const GetMembers = async (chatId: string): Promise<TelegramUser[]> => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChatAdministrators?chat_id=${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description || "Failed to fetch chat administrators");
    }

    const members: TelegramUser[] = data.result.map((member: TelegramUser) => ({
      id: member.id ? member.id.toString() : "",
      name: `${member.first_name} ${member.last_name || ""}`.trim(),
      photo_url: member.photo_url || "https://via.placeholder.com/40",
    }));

    return members;
  } catch (error) {
    console.error("Error fetching group members:", error);
    return [];
  }
};

// Alternative for full member list (requires backend or MTProto):
/*
export const GetMembers = async (chatId: string): Promise<User[]> => {
  try {
    // Example: Call a backend endpoint that uses MTProto or a custom Telegram API
    const response = await fetch(`https://your-backend-api/getChatMembers?chat_id=${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${YOUR_BACKEND_AUTH_TOKEN}`,
      },
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.error || "Failed to fetch chat members");
    }

    const members: User[] = data.result.map((member: any) => ({
      id: member.user.id.toString(),
      name: `${member.user.first_name} ${member.user.last_name || ""}`.trim(),
      photo_url: member.user.photo_url || "https://via.placeholder.com/40",
      phone: member.user.phone_number || "",
      bio: member.user.bio || "",
    }));

    return members;
  } catch (error) {
    console.error("Error fetching group members:", error);
    return [];
  }
};
*/

export const GetMemberById = async (id: number): Promise<TelegramUser | null> => {
  const members = await GetMembers("mock_chat_id");
  return members.find((member) => member.id === id) || null;
};
