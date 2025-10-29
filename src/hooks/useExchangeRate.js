import { useQuery } from '@tanstack/react-query'

const BASE_URL = 'https://api.exchangerate-api.com/v4/latest'

const fetchExchangeRates = async (baseCurrency = 'USD') => {
  const response = await fetch(`${BASE_URL}/${baseCurrency}`)
  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates')
  }
  return response.json()
}

export const useExchangeRate = (baseCurrency = 'USD', options = {}) => {
  return useQuery({
    queryKey: ['exchangeRate', baseCurrency],
    queryFn: () => fetchExchangeRates(baseCurrency),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    ...options
  })
}

export const useSpecificExchangeRate = (fromCurrency, toCurrency, options = {}) => {
  return useQuery({
    queryKey: ['specificExchangeRate', fromCurrency, toCurrency],
    queryFn: async () => {
      const data = await fetchExchangeRates(fromCurrency)
      return {
        from: fromCurrency,
        to: toCurrency,
        rate: data.rates[toCurrency],
        date: data.date,
        base: data.base
      }
    },
    enabled: !!(fromCurrency && toCurrency),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...options
  })
}

export const POPULAR_CURRENCIES = [
  { code: 'USD', name: 'Dólar Americano', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '£' },
  { code: 'JPY', name: 'Iene Japonês', symbol: '¥' },
  { code: 'CAD', name: 'Dólar Canadense', symbol: 'C$' },
  { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$' },
  { code: 'CHF', name: 'Franco Suíço', symbol: 'CHF' },
  { code: 'CNY', name: 'Yuan Chinês', symbol: '¥' },
  { code: 'INR', name: 'Rupia Indiana', symbol: '₹' }
]