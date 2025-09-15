const webApp = window.Telegram?.WebApp;

export const initTelegram = () => {
  if (webApp) {
    webApp.ready();
  }
};

export const getUser = () => {
  if (webApp && webApp.initDataUnsafe && webApp.initDataUnsafe.user) {
    const { first_name, last_name, photo_url } = webApp.initDataUnsafe.user;
    return {
      name: `${first_name || ''} ${last_name || ''}`.trim() || 'Guest',
      photo: photo_url || 'https://via.placeholder.com/40',
    };
  }
  return {
    name: 'Guest',
    photo: 'https://via.placeholder.com/40',
  };
};