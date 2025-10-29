import Navbar from './components/Navbar'
import ExchangeRate from './components/ExchangeRate'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <ExchangeRate />
      </main>
    </div>
  )
}

export default App
