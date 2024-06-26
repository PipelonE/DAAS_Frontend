import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

interface Producto {
  idProducto: number;
  nombreProducto: string;
}

export default function Compra_Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<number | undefined>(undefined);
  const [cantidad, setCantidad] = useState<string>('');
  const [precio, setPrecio] = useState<string>('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://192.168.96.37:4000/pro/ver_pro');
        const productos: Producto[] = await response.json();
        setProductos(productos);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleRegistrarVenta = async () => {
    if (selectedProducto === undefined) {
      Alert.alert('Error', 'Por favor, selecciona un producto');
      return;
    }

    try {
      const response = await fetch('http://192.168.96.37:4000/regis_venta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idProducto: selectedProducto,
          cantidad: parseInt(cantidad, 10),
          precio_unitario: parseFloat(precio),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', 'Venta registrada exitosamente');
      } else {
        Alert.alert('Error', result.message || 'Hubo un problema al registrar la venta');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true} extraScrollHeight={20}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/Logo_alternativo.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Registrar Venta</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Producto</Text>
        <Picker
          selectedValue={selectedProducto}
          style={styles.input}
          onValueChange={(itemValue: number, itemIndex: number) => setSelectedProducto(itemValue)}
        >
          {productos.map(producto => (
            <Picker.Item key={producto.idProducto} label={producto.nombreProducto} value={producto.idProducto} />
          ))}
        </Picker>
        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Precio Unitario</Text>
        <TextInput
          style={styles.input}
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button title="Registrar Venta" onPress={handleRegistrarVenta} color="#009929" />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fcdc5cff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009929',
  },
  form: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: '#009929',
    borderWidth: 2,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#009929',
  },
  input: {
    height: 40,
    width: '90%',
    borderBottomColor: '#009929',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
