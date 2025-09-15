import css from "./index.module.scss";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  speed?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 50,
  color = "#4a90e2",
  speed = 1.5,
}) => {
  return (
    <div className={css.loadingSpinnerContainer}>
      <div
        className={css.loadingSpinner}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${speed}s`,
          borderColor: `${color} transparent transparent transparent`,
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
