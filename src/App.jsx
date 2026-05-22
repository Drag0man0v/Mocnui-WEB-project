import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import styles from './styleModules/App.module.css'

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
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}