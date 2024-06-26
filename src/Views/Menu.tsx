import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

export default function Menu() {
  const [productos, setProductos] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [showTable, setShowTable] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (showTable) {
      fetchProductos();
      fetchTotalCantidad();
    }
  }, [showTable]);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://192.168.96.37:4000/pro/ver_pro');
      const productos = await response.json();
      setProductos(productos);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchTotalCantidad = async () => {
    try {
      const response = await fetch('http://192.168.96.37:4000/pro/ver_total_pro');
      const result = await response.json();
      setTotalCantidad(result[0]?.total_cantidad || 0);
    } catch (error) {
      console.error('Error fetching total cantidad:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Productos en Inventario</Text>
      <Button
        title={showTable ? "Ocultar Productos" : "Mostrar Productos"}
        onPress={() => setShowTable(!showTable)}
        color="#009929"
      />
      {showTable && (
        <View style={styles.tableContainer}>
          <Text style={styles.total}>Total Cantidad: {totalCantidad}</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nombre</DataTable.Title>
              <DataTable.Title>Código</DataTable.Title>
              <DataTable.Title>Descripción</DataTable.Title>
              <DataTable.Title>Precio</DataTable.Title>
              <DataTable.Title>Cantidad</DataTable.Title>
            </DataTable.Header>
            {productos.map((producto: { idProducto: number; nombreProducto: string; codigoProducto: number; descripcion: string; precio: number; cantidad: number }) => (
              <DataTable.Row key={producto.idProducto}>
                <DataTable.Cell>{producto.nombreProducto}</DataTable.Cell>
                <DataTable.Cell>{producto.codigoProducto}</DataTable.Cell>
                <DataTable.Cell>{producto.descripcion}</DataTable.Cell>
                <DataTable.Cell>{producto.precio}</DataTable.Cell>
                <DataTable.Cell>{producto.cantidad}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fcdc5cff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009929',
    marginBottom: 20,
  },
  tableContainer: {
    width: '100%',
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009929',
    marginBottom: 10,
    textAlign: 'center',
  },
});
