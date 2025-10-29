import { useState } from 'react'
import { useExchangeRate, useSpecificExchangeRate, POPULAR_CURRENCIES } from '../hooks/useExchangeRate'
import CurrencyTrends from './CurrencyTrends'
import './ExchangeRate.css'

const ExchangeRate = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [amount, setAmount] = useState(1)

  const { data: allRates, isLoading: isLoadingAll, error: errorAll } = useExchangeRate(baseCurrency)
  const { data: specificRate, isLoading: isLoadingSpecific, error: errorSpecific } = useSpecificExchangeRate(fromCurrency, toCurrency)

  const formatCurrency = (value, currencyCode) => {
    const currency = POPULAR_CURRENCIES.find(c => c.code === currencyCode)
    return `${currency?.symbol || ''} ${parseFloat(value).toFixed(2)}`
  }

  const convertedAmount = specificRate ? (amount * specificRate.rate).toFixed(2) : 0

  if (errorAll || errorSpecific) {
    return (
      <div className="exchange-rate-container">
        <div className="error">
          Erro ao carregar cotações: {errorAll?.message || errorSpecific?.message}
        </div>
      </div>
    )
  }

  return (
    <div className="exchange-rate-container">
      <h2>Cotações de Moedas</h2>
      
      <div className="converter-section">
        <h3>Conversor de Moedas</h3>
        <div className="converter-controls">
          <div className="input-group">
            <label>Valor:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="currency-selectors">
            <div className="selector-group">
              <label>De:</label>
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {POPULAR_CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="selector-group">
              <label>Para:</label>
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {POPULAR_CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {isLoadingSpecific ? (
          <div className="loading">Carregando cotação...</div>
        ) : specificRate ? (
          <div className="conversion-result">
            <p>
              {formatCurrency(amount, fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
            </p>
            <p className="rate-info">
              Taxa: 1 {fromCurrency} = {specificRate.rate.toFixed(4)} {toCurrency}
            </p>
            <p className="date-info">Atualizado em: {specificRate.date}</p>
          </div>
        ) : null}
      </div>

      <div className="rates-section">
        <h3>Todas as Cotações</h3>
        <div className="base-currency-selector">
          <label>Moeda Base:</label>
          <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
            {POPULAR_CURRENCIES.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {isLoadingAll ? (
          <div className="loading">Carregando cotações...</div>
        ) : allRates ? (
          <div className="rates-grid">
            {POPULAR_CURRENCIES
              .filter(currency => currency.code !== baseCurrency)
              .map(currency => {
                const rate = allRates.rates[currency.code]
                return rate ? (
                  <div key={currency.code} className="rate-card">
                    <div className="currency-info">
                      <span className="currency-code">{currency.code}</span>
                      <span className="currency-name">{currency.name}</span>
                    </div>
                    <div className="rate-value">
                      1 {baseCurrency} = {rate.toFixed(4)} {currency.code}
                    </div>
                  </div>
                ) : null
              })}
          </div>
        ) : null}
        
        {allRates && (
          <div className="last-updated">
            Última atualização: {allRates.date}
          </div>
        )}
      </div>

      <CurrencyTrends />
    </div>
  )
}

export default ExchangeRate