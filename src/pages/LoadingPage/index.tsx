import React, { useState, useEffect } from 'react';
import ProgressSlider from './ProgressSlider';
import './LoadingPage.scss';

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
    <div className="loadingPage">
      <div className="loadingPage__content">
        <div className="loadingPage__logo">
          <div className="logoSpinner">⚡</div>
        </div>
        
        <h1 className="loadingPage__title">
          Загружаем приложение
        </h1>
        
        <p className="loadingPage__subtitle">
          Пожалуйста, подождите...
        </p>

        <div className="loadingPage__progress">
          <ProgressSlider 
            progress={progress}
            height={6}
            color="#ff6b6b"
          />
          <span className="loadingPage__percentage">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;