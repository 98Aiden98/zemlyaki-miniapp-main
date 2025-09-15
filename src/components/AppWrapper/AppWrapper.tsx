import { isTMA } from "@telegram-apps/sdk-react";
import type { FC, PropsWithChildren } from "react";

export const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  const isTelegramApp = isTMA();
  return (
    <div>
      {isTelegramApp ? children : <div>Откройте приложение в Telegram</div>}
    </div>
  );
};