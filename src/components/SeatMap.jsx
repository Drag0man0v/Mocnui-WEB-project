import { useBooking } from '../context/BookingContext';
import { getBookedSeats } from '../services/BookingService';
import styles from '../styleModules/SeatMap.module.css';

export default function SeatMap({ trainId }) {
  const { selectedWagon, selectedSeats, toggleSeat } = useBooking();

  if (!selectedWagon) {
    return (
      <div className={styles.placeholder}>
        <span>👆 Оберіть вагон для відображення схеми місць</span>
      </div>
    );
  }

  const savedBooked = getBookedSeats(trainId, selectedWagon.id);

  const getSeatStatus = (seat) => {
    if (seat.status === 'booked' || savedBooked.includes(seat.id)) return 'booked';
    if (selectedSeats.find((s) => s.id === seat.id)) return 'selected';
    return 'free';
  };

  // ділимо місця на групи по 4 (2+2)
  const groupedSeats = [];
  for (let i = 0; i < selectedWagon.seats.length; i += 4) {
    groupedSeats.push(selectedWagon.seats.slice(i, i + 4));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Вагон №{selectedWagon.number} · {selectedWagon.type}</h3>
        {selectedSeats.length > 0 && (
          <span className={styles.selectedCount}>
            Обрано: {selectedSeats.map((s) => s.number).join(', ')}
          </span>
        )}
      </div>

      <div className={styles.legend}>
        <span className={`${styles.dot} ${styles.free}`} /> Вільне
        <span className={`${styles.dot} ${styles.selected}`} /> Обране
        <span className={`${styles.dot} ${styles.booked}`} /> Зайняте
      </div>

      <div className={styles.trainBody}>
        {groupedSeats.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.seatGroup}>
            <div className={styles.row}>
              {group.slice(0, 2).map((seat) => {
                const status = getSeatStatus(seat);
                return (
                  <button
                    key={seat.id}
                    className={`${styles.seat} ${styles[status]}`}
                    disabled={status === 'booked'}
                    onClick={() => status !== 'booked' && toggleSeat(seat)}
                    title={`Місце ${seat.number}`}
                  >
                    <span className={styles.seatNum}>{seat.number}</span>
                  </button>
                );
              })}
            </div>
            <div className={styles.corridor} />
            <div className={styles.row}>
              {group.slice(2, 4).map((seat) => {
                const status = getSeatStatus(seat);
                return (
                  <button
                    key={seat.id}
                    className={`${styles.seat} ${styles[status]}`}
                    disabled={status === 'booked'}
                    onClick={() => status !== 'booked' && toggleSeat(seat)}
                    title={`Місце ${seat.number}`}
                  >
                    <span className={styles.seatNum}>{seat.number}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}