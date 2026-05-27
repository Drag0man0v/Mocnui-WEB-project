import { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { saveBooking } from '../services/BookingService';
import styles from '../styleModules/BookingForm.module.css';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[\d\s\+\-\(\)]{10,}$/.test(phone.trim());

export default function BookingForm({ train, onSuccess }) {
  const { selectedWagon, selectedSeats, clearBooking } = useBooking();

  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Введіть ім'я (мін. 2 символи)";
    if (!validatePhone(form.phone)) e.phone = 'Введіть коректний номер телефону';
    if (!validateEmail(form.email)) e.email = 'Введіть коректний email';
    if (!selectedWagon) e.wagon = 'Оберіть вагон';
    if (selectedSeats.length === 0) e.seats = 'Оберіть хоча б одне місце';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    const booking = saveBooking({
      trainId: train.id,
      trainNumber: train.number,
      route: `${train.from} → ${train.to}`,
      date: train.date,
      time: train.time,
      wagonId: selectedWagon.id,
      wagonNumber: selectedWagon.number,
      wagonType: selectedWagon.type,
      seats: selectedSeats,
      passenger: form,
    });

    setLoading(false);
    clearBooking();
    onSuccess(booking);
  };

  const total = selectedSeats.length * train.price;

  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Дані пасажира</h3>

      <div className={styles.field}>
        <label className={styles.label}>Ім'я та прізвище</label>
        <input
          className={`${styles.input} ${errors.name ? styles.error : ''}`}
          name="name"
          type="text"
          placeholder="Іваненко Іван"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Телефон</label>
        <input
          className={`${styles.input} ${errors.phone ? styles.error : ''}`}
          name="phone"
          type="tel"
          placeholder="+380 XX XXX XX XX"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
      </div>

      {(errors.wagon || errors.seats) && (
        <div className={styles.globalError}>
          {errors.wagon && <span>⚠ {errors.wagon}</span>}
          {errors.seats && <span>⚠ {errors.seats}</span>}
        </div>
      )}

      {selectedSeats.length > 0 && selectedWagon && (
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Вагон</span>
            <span>№{selectedWagon.number} · {selectedWagon.type}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Місця</span>
            <span>{selectedSeats.map((s) => s.number).join(', ')}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>{selectedSeats.length} × {train.price} ₴</span>
            <span className={styles.total}>{total} ₴</span>
          </div>
        </div>
      )}

      <button
        className={styles.btn}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <span className={styles.spinner} /> : '🎫 Забронювати'}
      </button>
    </div>
  );
}
