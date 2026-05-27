import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { BookingProvider } from './context/BookingContext'
import { trains } from './data/trains'
import WagonSelector from './components/WagonSelector'
import SeatMap from './components/SeatMap'
import styles from './styleModules/App.module.css'
import BookingForm from './components/BookingForm'
function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        🚆 РЗ Квитки
      </a>
    </header>
  )
}

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Header />
        <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
          <WagonSelector wagons={trains[0].wagons} />
          <SeatMap trainId={trains[0].id} />
          <BookingForm train={trains[0]} onSuccess={(b) => console.log(b)} />
        </main>
      </BrowserRouter>
    </BookingProvider>
  )
}