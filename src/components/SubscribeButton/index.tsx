import { SubscribeButtonProps } from './interface';
import styles from './styles.module.scss';

export function SubscribeButton({priceId}: SubscribeButtonProps) {
    return (
        <button
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe now
        </button>


    );
}