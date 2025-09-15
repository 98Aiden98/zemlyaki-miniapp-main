export interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  name?: string;
}

export interface LaunchParams {
  tgWebAppData?: {
    user?: TelegramUser;
  };
}