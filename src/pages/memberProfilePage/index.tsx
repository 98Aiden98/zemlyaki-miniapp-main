import css from "./index.module.scss"; 
import { GetUser, GetMemberById } from "../../lib/telegram";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { TelegramUser } from "../../types/telegram";

const MemberProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = GetUser();
  const [member, setMember] = useState<TelegramUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id) {
        setError("ID участника не указан");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const chatId = "-4863017528";
        const fetchedMember = await GetMemberById(id, chatId);
        setMember(fetchedMember);
      } catch (err) {
        console.error("Failed to fetch member:", err);
        setError("Не удалось загрузить данные участника");
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  return (
    <div className={css.profileContainer}>
      <header className={css.header}>
        <img
          src={user.photo_url}
          alt="User Avatar"
          className={css.header__avatar}
        />
        <h1 className={css.header__name}>{user.name}</h1>
      </header>
      <main className={css.profileContent}>
        {loading ? (
          <div className={css.loading}>Загрузка...</div>
        ) : error ? (
          <div className={css.error}>{error}</div>
        ) : !member ? (
          <div className={css.noMember}>Участник не найден</div>
        ) : (
          <section className={css.profileInfo}>
            <h2 className={css.profileInfo__title}>Информация об участнике</h2>
            <img
              src={member.photo_url}
              alt={`${member.name} Avatar`}
              className={css.profileInfo__avatar}
            />
            <div className={css.profileInfo__item}>
              <span className={css.profileInfo__label}>Имя:</span>
              <span className={css.profileInfo__value}>{member.name}</span>
            </div>
            <div className={css.profileInfo__item}>
              <span className={css.profileInfo__label}>ID:</span>
              <span className={css.profileInfo__value}>{member.id}</span>
            </div>
            <div className={css.profileInfo__item}>
              <span className={css.profileInfo__label}>Имя пользователя:</span>
              <span className={css.profileInfo__value}>
                {member.username || "Не указан"}
              </span>
            </div>
          </section>
        )}
        <button
          className={css.backButton}
          onClick={() => navigate("/members")}
        >
          Назад
        </button>
      </main>
    </div>
  );
};

export default MemberProfilePage;