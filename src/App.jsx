import { BrowserRouter } from 'react-router-dom'
import TrainList from './components/TrainList'
import { trains } from './data/trains'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <TrainList trains={trains} />
      </div>
    </BrowserRouter>
  )
}