import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a8a',
    borderBottomStyle: 'solid'
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 5
  },
  companyInfo: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  infoSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 5
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e3a8a',
    width: 120
  },
  infoValue: {
    fontSize: 12,
    color: '#334155'
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1e3a8a',
    borderBottomStyle: 'solid',
    paddingBottom: 8,
    marginBottom: 10
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e3a8a',
    flex: 1,
    textAlign: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid'
  },
  tableCell: {
    fontSize: 10,
    color: '#334155',
    flex: 1,
    textAlign: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    borderTopStyle: 'solid',
    paddingTop: 10
  },
  footerText: {
    fontSize: 10,
    color: '#64748b'
  }
})

const ExtractReport = ({ extractData }) => {
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('pt-BR')
  const formattedTime = currentDate.toLocaleTimeString('pt-BR')

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>Açoriana Corretora</Text>
          <Text style={styles.companyInfo}>CNPJ: 12.345.678/0001-90</Text>
          <Text style={styles.companyInfo}>Endereço: Rua das Finanças, 123 - São Paulo/SP</Text>
          <Text style={styles.companyInfo}>Telefone: (11) 3456-7890</Text>
        </View>

        <Text style={styles.title}>EXTRATO DE OPERAÇÕES</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cliente:</Text>
            <Text style={styles.infoValue}>{extractData.clientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>CPF/CNPJ:</Text>
            <Text style={styles.infoValue}>{extractData.document}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Data de Emissão:</Text>
            <Text style={styles.infoValue}>{formattedDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hora de Emissão:</Text>
            <Text style={styles.infoValue}>{formattedTime}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Período:</Text>
            <Text style={styles.infoValue}>{extractData.period}</Text>
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Data</Text>
          <Text style={styles.tableHeaderCell}>Operação</Text>
          <Text style={styles.tableHeaderCell}>Moeda</Text>
          <Text style={styles.tableHeaderCell}>Valor</Text>
          <Text style={styles.tableHeaderCell}>Taxa</Text>
        </View>

        {extractData.operations.map((operation, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{operation.date}</Text>
            <Text style={styles.tableCell}>{operation.type}</Text>
            <Text style={styles.tableCell}>{operation.currency}</Text>
            <Text style={styles.tableCell}>{operation.value}</Text>
            <Text style={styles.tableCell}>{operation.rate}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Documento gerado automaticamente pelo sistema Açotiana Corretora
          </Text>
          <Text style={styles.footerText}>
            {formattedDate} às {formattedTime}
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default ExtractReport