import { useState } from 'react';
import TrainCard from './TrainCard';
import styles from '../styleModules/TrainList.module.css';

export default function TrainList({ trains }) {
  const [query, setQuery] = useState('');

  const filtered = trains.filter((t) => {
    const q = query.toLowerCase();
    return (
      t.from.toLowerCase().includes(q) ||
      t.to.toLowerCase().includes(q) ||
      t.number.toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Місто або номер поїзда..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Рейсів за запитом «{query}» не знайдено</p>
        </div>
      ) : (
        <>
          <p className={styles.count}>{filtered.length} рейсів</p>
          <div className={styles.list}>
            {filtered.map((train) => (
              <TrainCard key={train.id} train={train} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}