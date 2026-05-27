import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { BookingProvider } from './context/BookingContext'
import { trains } from './data/trains'
import styles from './styleModules/App.module.css'
import Booking from './pages/Booking'

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
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:trainId" element={<Booking />} />
          </Routes>
        </main>
      </BrowserRouter>
    </BookingProvider>
  )
}