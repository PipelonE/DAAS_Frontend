import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

export default function Ventas() {
  const [productos, setProductos] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [showProductos, setShowProductos] = useState(false);

  const [ventas, setVentas] = useState([]);
  const [showVentas, setShowVentas] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (showProductos) {
      fetchProductos();
      fetchTotalCantidad();
    }
    if (showVentas) {
      fetchVentas();
    }
  }, [showProductos, showVentas]);

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

  const fetchVentas = async () => {
    try {
      const response = await fetch('http://192.168.96.37:4000/ver_ventas');
      const ventas = await response.json();
      setVentas(ventas);
    } catch (error) {
      console.error('Error fetching ventas:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Productos en Inventario */}
      <Text style={styles.title}>Productos en Inventario</Text>
      <Button
        title={showProductos ? "Ocultar Productos" : "Mostrar Productos"}
        onPress={() => setShowProductos(!showProductos)}
        color="#009929"
      />
      {showProductos && (
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

      {/* Detalles de Ventas */}
      <Text style={styles.title}>Detalles de Ventas</Text>
      <Button
        title={showVentas ? "Ocultar Ventas" : "Mostrar Ventas"}
        onPress={() => setShowVentas(!showVentas)}
        color="#009929"
      />
      {showVentas && (
        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ID Detalle Venta</DataTable.Title>
              <DataTable.Title>Nombre Producto</DataTable.Title>
              <DataTable.Title>Cantidad</DataTable.Title>
              <DataTable.Title>Precio Unitario</DataTable.Title>
              <DataTable.Title>Subtotal</DataTable.Title>
              <DataTable.Title>Fecha Venta</DataTable.Title>
            </DataTable.Header>
            {ventas.map((venta: { id_detalle_venta: number; nombreProducto: string; cantidad: number; precio_unitario: number; subtotal: number; fecha_venta: string }) => (
              <DataTable.Row key={venta.id_detalle_venta}>
                <DataTable.Cell>{venta.id_detalle_venta}</DataTable.Cell>
                <DataTable.Cell>{venta.nombreProducto}</DataTable.Cell>
                <DataTable.Cell>{venta.cantidad}</DataTable.Cell>
                <DataTable.Cell>{venta.precio_unitario}</DataTable.Cell>
                <DataTable.Cell>{venta.subtotal}</DataTable.Cell>
                <DataTable.Cell>{venta.fecha_venta}</DataTable.Cell>
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
