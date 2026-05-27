import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trains } from '../data/trains';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';
import styles from '../styleModules/Booking.module.css';

export default function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const [successBooking, setSuccessBooking] = useState(null);

  const train = trains.find((t) => t.id === trainId);

  if (!train) {
    return (
      <div className={styles.notFound}>
        <p>Рейс не знайдено</p>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Назад</button>
      </div>
    );
  }

  if (successBooking) {
    return (
      <div className={styles.success}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.successTitle}>Квиток заброньовано!</h2>
          <p className={styles.successId}>Номер бронювання: <strong>{successBooking.id}</strong></p>

          <div className={styles.successDetails}>
            <div className={styles.detailRow}>
              <span>Маршрут</span>
              <span>{successBooking.route}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Дата</span>
              <span>{new Date(successBooking.date).toLocaleDateString('uk-UA')} о {successBooking.time}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Вагон</span>
              <span>№{successBooking.wagonNumber} · {successBooking.wagonType}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Місця</span>
              <span>{successBooking.seats.map((s) => s.number).join(', ')}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Пасажир</span>
              <span>{successBooking.passenger.name}</span>
            </div>
          </div>

          <button className={styles.homeBtn} onClick={() => navigate('/')}>
            На головну
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.back} onClick={() => navigate('/')}>
          ← Назад
        </button>
        <div className={styles.routeInfo}>
          <span className={styles.routeText}>{train.from} → {train.to}</span>
          <span className={styles.trainMeta}>Поїзд №{train.number} · {new Date(train.date).toLocaleDateString('uk-UA')} · {train.time}</span>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.left}>
          <section className={styles.section}>
            <WagonSelector wagons={train.wagons} />
          </section>
          <section className={styles.section}>
            <SeatMap trainId={train.id} />
          </section>
        </div>

        <div className={styles.right}>
          <BookingForm train={train} onSuccess={setSuccessBooking} />
        </div>
      </div>
    </div>
  );
}
