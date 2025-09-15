import css from "./index.module.scss";
import { GetUser } from "../../lib/telegram";
import { useNavigate } from "react-router-dom";
import { getChatsPage, getMembersPage, getProfilePage } from "../../lib/routes";

const MainPage = () => {
  const navigate = useNavigate();
  const user = GetUser();

  const menuItems = [
    { id: 1, title: "Профиль", icon: "👤", path: getProfilePage() },
    { id: 2, title: "Участники", icon: "👥", path: getMembersPage() },
    { id: 3, title: "Мероприятия", icon: "📅", path: "/events" },
    { id: 4, title: "Чаты", icon: "💬", path: getChatsPage() },
  ];

  return (
    <div className={css.appContainer}>
      <header className={css.header}>
        <img
          src={user.photo_url}
          alt="User Avatar"
          className={css.header__avatar}
        />
        <h1 className={css.header__name}>{user.name}</h1>
      </header>
      <main className={css.menu}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={css.menu__button}
            onClick={() => navigate(item.path)}
          >
            <span className={css.menu__icon}>{item.icon}</span>
            <span className={css.menu__title}>{item.title}</span>
          </button>
        ))}
      </main>
    </div>
  );
};

export default MainPage;
