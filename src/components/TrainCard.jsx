import { useNavigate } from 'react-router-dom';
import styles from '../styleModules/TrainCard.module.css';

export default function TrainCard({ train }) {
  const navigate = useNavigate();

  const totalSeats = train.wagons.reduce((acc, w) => acc + w.seats.length, 0);
  const freeSeats = train.wagons.reduce(
    (acc, w) => acc + w.seats.filter((s) => s.status === 'free').length,
    0
  );

  const dateObj = new Date(train.date);
  const dateStr = dateObj.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.trainNumber}>№ {train.number}</span>
        <span className={styles.date}>{dateStr}</span>
      </div>

      <div className={styles.route}>
        <div className={styles.stop}>
          <span className={styles.time}>{train.time}</span>
          <span className={styles.city}>{train.from}</span>
          <span className={styles.code}>{train.fromCode}</span>
        </div>

        <div className={styles.line}>
          <span className={styles.duration}>{train.duration}</span>
          <div className={styles.track}>
            <div className={styles.dot} />
            <div className={styles.dash} />
            <svg className={styles.arrow} viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className={`${styles.stop} ${styles.stopRight}`}>
          <span className={styles.time}>{train.arrivalTime}</span>
          <span className={styles.city}>{train.to}</span>
          <span className={styles.code}>{train.toCode}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Вагонів</span>
            <span className={styles.metaValue}>{train.wagons.length}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Вільних місць</span>
            <span className={`${styles.metaValue} ${freeSeats < 10 ? styles.low : ''}`}>
              {freeSeats}/{totalSeats}
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Від</span>
            <span className={styles.price}>{train.price} ₴</span>
          </div>
        </div>

        <div className={styles.wagons}>
          {train.wagons.map((w) => (
            <span key={w.id} className={styles.wagonBadge}>{w.type}</span>
          ))}
        </div>

        <button
          className={styles.btn}
          onClick={() => navigate(`/booking/${train.id}`)}
        >
          Обрати місця →
        </button>
      </div>
    </div>
  );
}
