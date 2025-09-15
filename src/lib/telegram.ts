
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

const BOT_TOKEN = import.meta.env.VITE_APP_TELEGRAM_BOT_TOKEN || "not_set";

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

async function getUserPhotoUrl(userId: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}&limit=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!data.ok || !data.result.photos || data.result.photos.length === 0) {
      return "https://via.placeholder.com/40";
    }
    const photo = data.result.photos[0][0];
    const fileResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${photo.file_id}`
    );
    const fileData = await fileResponse.json();
    if (!fileData.ok) {
      throw new Error(fileData.description || "Failed to fetch file path");
    }
    return `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileData.result.file_path}`;
  } catch (error) {
    console.error(`Error fetching photo for user ${userId}:`, error);
    return "https://via.placeholder.com/40";
  }
}


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
    console.log(data);

    const members: TelegramUser[] = await Promise.all(
      data.result.map(async (member: {user: TelegramUser}) => {
        const photo_url = await getUserPhotoUrl(member.user.id.toString());
        return {
          id: member.user.id.toString(),
          name: `${member.user.first_name} ${member.user.last_name || ""}`.trim(),
          first_name: member.user.first_name,
          last_name: member.user.last_name || "",
          username: member.user.username || "",
          photo_url,
        };
      })
    );

    return members;
  } catch (error) {
    console.error("Error fetching group members:", error);
    return [];
  }
};

export const GetMemberById = async (id: string, chatId: string = "mock_chat_id"): Promise<TelegramUser | null> => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${chatId}&user_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description || "Failed to fetch member");
    }
    const member = data.result;
    const photo_url = await getUserPhotoUrl(id);
    return {
      id: member.user.id.toString(),
      name: `${member.user.first_name} ${member.user.last_name || ""}`.trim(),
      first_name: member.user.first_name,
      last_name: member.user.last_name || "",
      username: member.user.username || "",
      photo_url,
    };
  } catch (error) {
    console.error(`Error fetching member ${id}:`, error);
    return null;
  }
};
