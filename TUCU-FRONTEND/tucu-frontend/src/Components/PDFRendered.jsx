import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 7,
    padding: 7,
    flexGrow: 1,
  },
  header: {
    fontSize: 15,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  cell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 8,
  },
});

const PDFRendered = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Historial de Entregas</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.cell}>N° Domicilio</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cell}>Fecha de creación</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cell}>Hora de solicitud</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cell}>Domiciliario</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cell}>Dirección Destino</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cell}>Estado</Text>
            </View>
          </View>

          {data.map((delivery, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{new Date(delivery.timestamp).toLocaleDateString('es-ES')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{new Date(delivery.timestamp).toLocaleTimeString()}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{delivery.DELIVERYMEN.surname}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{delivery.address}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{getStateText(delivery.state)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const getStateText = (state) => {
  switch (state) {
    case 1:
      return 'EN PREPARACIÓN';
    case 2:
      return 'EN CAMINO';
    case 3:
      return 'ENTREGADO';
    default:
      return '';
  }
};

export default PDFRendered;
