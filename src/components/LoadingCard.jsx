import styles from '../styles/components/LoadingCard.module.css';

function LoadingCard() {
  return (
    <div className={ styles.containerLoading }>
      <div className={ styles.cloader } />
    </div>
  );
}

export default LoadingCard;
