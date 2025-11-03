import React, { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ExtractReport from './ExtractReport'
import './Extract.css'

const Extract = () => {
  const [extractData] = useState({
    clientName: 'João Silva Santos',
    document: '123.456.789-00',
    period: '01/10/2025 a 31/10/2025',
    operations: [
      {
        date: '15/10/2025',
        type: 'Compra USD',
        currency: 'USD/BRL',
        value: 'R$ 5.000,00',
        rate: '5.4521'
      },
      {
        date: '18/10/2025',
        type: 'Venda EUR',
        currency: 'EUR/BRL',
        value: 'R$ 3.200,00',
        rate: '5.9876'
      },
      {
        date: '22/10/2025',
        type: 'Compra GBP',
        currency: 'GBP/BRL',
        value: 'R$ 2.500,00',
        rate: '6.8432'
      },
      {
        date: '25/10/2025',
        type: 'Venda USD',
        currency: 'USD/BRL',
        value: 'R$ 1.800,00',
        rate: '5.4789'
      },
      {
        date: '28/10/2025',
        type: 'Compra EUR',
        currency: 'EUR/BRL',
        value: 'R$ 4.100,00',
        rate: '5.9654'
      }
    ]
  })

  const totalOperations = extractData.operations.length
  const totalValue = extractData.operations.reduce((sum, op) => {
    const value = parseFloat(op.value.replace('R$ ', '').replace('.', '').replace(',', '.'))
    return sum + value
  }, 0)

  return (
    <div className="extract-container">
      <h2>Extrato de Operações</h2>
      
      <div className="extract-header">
        <div className="client-info">
          <h3>Informações do Cliente</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Nome:</span>
              <span className="info-value">{extractData.clientName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">CPF:</span>
              <span className="info-value">{extractData.document}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Período:</span>
              <span className="info-value">{extractData.period}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Corretora:</span>
              <span className="info-value">Açoriana Corretora de Câmbio</span>
            </div>
          </div>
        </div>

        <div className="extract-summary">
          <h3>Resumo</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Total de Operações:</span>
              <span className="summary-value">{totalOperations}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Volume Total:</span>
              <span className="summary-value">
                R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="operations-section">
        <h3>Operações Realizadas</h3>
        <div className="operations-table">
          <div className="table-header">
            <span>Data</span>
            <span>Operação</span>
            <span>Par de Moedas</span>
            <span>Valor</span>
            <span>Taxa</span>
          </div>
          
          {extractData.operations.map((operation, index) => (
            <div key={index} className="table-row">
              <span>{operation.date}</span>
              <span className={operation.type.includes('Compra') ? 'buy-operation' : 'sell-operation'}>
                {operation.type}
              </span>
              <span>{operation.currency}</span>
              <span>{operation.value}</span>
              <span>{operation.rate}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="extract-actions">
        <PDFDownloadLink
          document={<ExtractReport extractData={extractData} />}
          fileName={`extrato-acotiana-${new Date().toISOString().split('T')[0]}.pdf`}
          className="download-button"
        >
          {({ loading }) =>
            loading ? 'Gerando PDF...' : 'Baixar Extrato em PDF'
          }
        </PDFDownloadLink>
        
        <button className="print-button" onClick={() => window.print()}>
          Imprimir
        </button>
      </div>
    </div>
  )
}

export default Extract