import React from 'react';
import css from './index.module.scss';

interface ProgressSliderProps {
  progress: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

const ProgressSlider: React.FC<ProgressSliderProps> = ({
  progress,
  height = 4,
  color = '#4a90e2',
  backgroundColor = '#e0e0e0'
}) => {
  return (
    <div 
      className={css.progressSlider}
      style={{
        height: `${height}px`,
        backgroundColor
      }}
    >
      <div 
        className={css.progressSlider__fill}
        style={{
          width: `${progress}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};

export default ProgressSlider;