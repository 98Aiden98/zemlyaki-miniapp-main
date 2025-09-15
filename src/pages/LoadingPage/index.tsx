import React, { useState, useEffect } from 'react';
import css from './index.module.scss';
import ProgressSlider from '../../components/Slider';

const LoadingPage: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.loadingPage}>
      <div className={css.loadingPage__content}>
        <div className={css.loadingPage__logo}>
          <div className={css.logoSpinner}>⚡</div>
        </div>
        
        <h1 className={css.loadingPage__title}>
          Загружаем приложение
        </h1>
        
        <p className={css.loadingPage__subtitle}>
          Пожалуйста, подождите...
        </p>

        <div className={css.loadingPage__progress}>
          <ProgressSlider 
            progress={progress}
            height={6}
            color="#ff6b6b"
          />
          <span className={css.loadingPage__percentage}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;