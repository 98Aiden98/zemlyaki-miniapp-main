import css from "./index.module.scss";
import { GetUser, GetMembers } from "../../lib/telegram";
import { useNavigate } from "react-router-dom";
import type { TelegramUser } from "../../types/telegram";
import { useEffect, useState } from "react";

const MembersPage = () => {
  const navigate = useNavigate();
  const user = GetUser();
  const [members, setMembers] = useState<TelegramUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const chatId = "4863017528";
        const fetchedMembers = await GetMembers(chatId);
        setMembers(fetchedMembers);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setError("Не удалось загрузить участников");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className={css.membersContainer}>
      <header className={css.header}>
        <img
          src={user.photo_url}
          alt="User Avatar"
          className={css.header__avatar}
        />
        <h1 className={css.header__name}>{user.name}</h1>
      </header>
      <main className={css.members}>
        {loading ? (
          <div className={css.loading}>Загрузка...</div>
        ) : error ? (
          <div className={css.error}>{error}</div>
        ) : members.length === 0 ? (
          <div className={css.noMembers}>Участники не найдены</div>
        ) : (
          members.map((member) => (
            <button
              key={member.id}
              className={css.members__button}
              onClick={() => navigate(`/member/${member.id}`)}
            >
              <img
                src={member.photo_url}
                alt={`${member.name} Avatar`}
                className={css.members__avatar}
              />
              <span className={css.members__name}>{member.name}</span>
            </button>
          ))
        )}
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

export default MembersPage;

