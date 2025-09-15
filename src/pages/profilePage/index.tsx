import css from "./ProfilePage.module.scss";
import { GetUser } from "../../lib/telegram";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = GetUser();

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
        <section className={css.profileInfo}>
          <h2 className={css.profileInfo__title}>Информация о профиле</h2>
          <div className={css.profileInfo__item}>
            <span className={css.profileInfo__label}>Имя:</span>
            <span className={css.profileInfo__value}>{user.name}</span>
          </div>
          <div className={css.profileInfo__item}>
            <span className={css.profileInfo__label}>ID:</span>
            <span className={css.profileInfo__value}>{user.id}</span>
          </div>
        </section>
        <button
          className={css.backButton}
          onClick={() => navigate("/")}
        >
          Назад
        </button>
      </main>
    </div>
  );
};

export default ProfilePage;