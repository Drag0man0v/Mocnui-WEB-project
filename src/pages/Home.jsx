import TrainList from '../components/TrainList';
import { trains } from '../data/trains';
import styles from '../styleModules/Home.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.sub}>Укрзалізниця</p>
        <h1 className={styles.heading}>
          Залізничні<br />квитки онлайн
        </h1>
        <p className={styles.desc}>
          Переглядайте розклад, обирайте вагон та бронюйте місця у кількох кліках
        </p>
      </div>

      <div className={styles.content}>
        <TrainList trains={trains} />
      </div>
    </div>
  );
}
