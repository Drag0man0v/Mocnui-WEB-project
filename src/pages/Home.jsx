import TrainList from '../components/TrainList';
import { trains } from '../data/trains';
import styles from '../styleModules/Home.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>Ростізниця</h1>
      </div>
      <div className={styles.content}>
        <TrainList trains={trains} />
      </div>
    </div>
  );
}
