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
      t.number.toLowerCase().includes(q) ||
      t.fromCode.toLowerCase().includes(q) ||
      t.toCode.toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          className={styles.input}
          type="text"
          placeholder="Місто або номер поїзда..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className={styles.clear} onClick={() => setQuery('')}>✕</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🚆</span>
          <p>Рейсів за запитом «{query}» не знайдено</p>
        </div>
      ) : (
        <>
          <p className={styles.count}>{filtered.length} рейс{filtered.length !== 1 ? 'ів' : ''}</p>
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
