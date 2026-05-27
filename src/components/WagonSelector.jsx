import { useBooking } from '../context/BookingContext';
import styles from '../styleModules/WagonSelector.module.css';

export default function WagonSelector({ wagons }) {
  const { selectedWagon, setSelectedWagon, clearBooking } = useBooking();

  const handleSelect = (wagon) => {
    if (selectedWagon?.id !== wagon.id) {
      clearBooking();
      setSelectedWagon(wagon);
    }
  };

  const typeColor = { 'СВ': styles.sv, 'Купе': styles.kupe, 'Плацкарт': styles.platzkart };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.label}>Оберіть вагон</h3>
      <div className={styles.list}>
        {wagons.map((wagon) => {
          const free = wagon.seats.filter((s) => s.status === 'free').length;
          const isActive = selectedWagon?.id === wagon.id;
          return (
            <button
              key={wagon.id}
              className={`${styles.wagon} ${isActive ? styles.active : ''}`}
              onClick={() => handleSelect(wagon)}
            >
              <span className={styles.wagonNum}>№{wagon.number}</span>
              <span className={`${styles.type} ${typeColor[wagon.type] || ''}`}>{wagon.type}</span>
              <span className={styles.free}>{free} місць</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
