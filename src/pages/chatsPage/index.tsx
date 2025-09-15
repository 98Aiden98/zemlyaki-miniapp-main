import css from "./index.module.scss";
import { GetUser } from "../../lib/telegram";
import { useNavigate } from "react-router-dom";

const ChatsPage = () => {
  const navigate = useNavigate();
  const user = GetUser();

  const chats = [
    { id: 1, title: "Общий чат", icon: "💬", path: "/chat/general" },
    { id: 2, title: "Чат мероприятий", icon: "📅", path: "/chat/events" },
    { id: 3, title: "Техподдержка", icon: "🛠️", path: "/chat/support" },
    { id: 4, title: "Личный чат", icon: "👤", path: "/chat/private" },
  ];

  return (
    <div className={css.chatsContainer}>
      <header className={css.header}>
        <img
          src={user.photo_url}
          alt="User Avatar"
          className={css.header__avatar}
        />
        <h1 className={css.header__name}>{user.name}</h1>
      </header>
      <main className={css.chats}>
        {chats.map((chat) => (
          <button
            key={chat.id}
            className={css.chats__button}
            onClick={() => navigate(chat.path)}
          >
            <span className={css.chats__icon}>{chat.icon}</span>
            <span className={css.chats__title}>{chat.title}</span>
          </button>
        ))}
      </main>
      <button
        className={css.backButton}
        onClick={() => navigate("/")}
      >
        Назад
      </button>
    </div>
  );
};

export default ChatsPage;