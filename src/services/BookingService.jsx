const KEY = 'railway_bookings';

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveBooking(booking) {
  const bookings = getBookings();
  const newBooking = {
    ...booking,
    id: `BK-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem(KEY, JSON.stringify(bookings));
  return newBooking;
}

export function getBookedSeats(trainId, wagonId) {
  const bookings = getBookings();
  return bookings
    .filter((b) => b.trainId === trainId && b.wagonId === wagonId)
    .flatMap((b) => b.seats.map((s) => s.id));
}
