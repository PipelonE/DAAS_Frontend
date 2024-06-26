import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

export default function RegistrarProducto() {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegistrar = async () => {
    try {
      const response = await fetch('http://192.168.96.37:4000/pro/regis_pro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreProducto: nombre,
          codigoProducto: codigo,
          descripcion: descripcion,
          precio: parseFloat(precio),
          cantidad: parseInt(cantidad, 10),
          estado: 1, // o el estado que desees por defecto
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', 'Producto registrado/actualizado exitosamente');
      } else {
        Alert.alert('Error', 'Hubo un problema al registrar/actualizar el producto');
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
      <Text style={styles.title}>Registrar Producto</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
        <Text style={styles.label}>Código del Producto</Text>
        <TextInput
          style={styles.input}
          value={codigo}
          onChangeText={setCodigo}
        />
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={styles.input}
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button title="Registrar" onPress={handleRegistrar} color="#009929" />
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
