import { useState, useEffect, useMemo } from 'react'
import { useExchangeRate } from '../hooks/useExchangeRate'
import './CurrencyTrends.css'

const CurrencyTrends = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('BRL')
  const [historicalData, setHistoricalData] = useState([])
  
  const { data: currentRates, isLoading } = useExchangeRate('USD')
  
  useEffect(() => {
    if (currentRates) {
      const generateHistoricalData = () => {
        const data = []
        const currentRate = currentRates.rates[selectedCurrency]
        
        for (let i = 7; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          
          const variation = (Math.random() - 0.5) * 0.1
          const rate = currentRate * (1 + variation)
          
          data.push({
            date: date.toLocaleDateString('pt-BR'),
            rate: rate.toFixed(4),
            change: variation > 0 ? '+' : '-'
          })
        }
        return data
      }
      
      setHistoricalData(generateHistoricalData())
    }
  }, [currentRates, selectedCurrency])
  
  const statistics = useMemo(() => {
    if (historicalData.length === 0) return null
    
    const rates = historicalData.map(item => parseFloat(item.rate))
    const highest = Math.max(...rates)
    const lowest = Math.min(...rates)
    const average = rates.reduce((sum, rate) => sum + rate, 0) / rates.length
    const latest = rates[rates.length - 1]
    const previous = rates[rates.length - 2]
    const dailyChange = ((latest - previous) / previous * 100).toFixed(2)
    
    return {
      highest: highest.toFixed(4),
      lowest: lowest.toFixed(4),
      average: average.toFixed(4),
      dailyChange,
      isPositive: dailyChange >= 0
    }
  }, [historicalData])
  
  if (isLoading) {
    return <div className="trends-loading">Carregando tendências...</div>
  }
  
  return (
    <div className="currency-trends">
      <h3>Tendências de Moeda</h3>
      
      <div className="currency-selector">
        <label>Selecione a moeda (vs USD):</label>
        <select 
          value={selectedCurrency} 
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          <option value="BRL">Real Brasileiro (BRL)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="GBP">Libra Esterlina (GBP)</option>
          <option value="JPY">Iene Japonês (JPY)</option>
          <option value="CAD">Dólar Canadense (CAD)</option>
        </select>
      </div>
      
      {statistics && (
        <div className="statistics-grid">
          <div className="stat-card">
            <span className="stat-label">Maior Alta (7 dias)</span>
            <span className="stat-value">{statistics.highest}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Menor Baixa (7 dias)</span>
            <span className="stat-value">{statistics.lowest}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Média (7 dias)</span>
            <span className="stat-value">{statistics.average}</span>
          </div>
        </div>
      )}
      
      <div className="historical-data">
        <h4>Histórico (Últimos 7 dias)</h4>
        <div className="data-table">
          {historicalData.map((item, index) => (
            <div key={index} className="data-row">
              <span className="date">{item.date}</span>
              <span className="rate">1 USD = {item.rate} {selectedCurrency}</span>
              <span className={`change ${item.change === '+' ? 'positive' : 'negative'}`}>
                {item.change === '+' ? '📈' : '📉'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CurrencyTrends