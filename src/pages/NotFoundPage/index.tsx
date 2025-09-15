 import css from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={css.notFoundContainer}>
      <h1 className={css.title}>Страница не найдена</h1>
      <p className={css.message}>Данной страницы пока нет =)</p>
      <button
        className={css.backButton}
        onClick={() => navigate("/")}
      >
        На главную
      </button>
    </div>
  );
};

export default NotFoundPage;