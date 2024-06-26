import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/Views/Menu';
import Compra_Producto from './src/Views/Compra_Producto';
import Registrar_producto from './src/Views/Registrar_producto';
import Ventas from './src/Views/Ventas';
import Icon from 'react-native-vector-icons/Ionicons';


export type RootStackParamList = {
  Menu: {estado: boolean};
  Registrar_producto: {estado: boolean};
  Compra_Producto: {estado: boolean};
  MainTabsAdmi: undefined;
  ProductStack: undefined;
  Ventas: {estado: boolean};

};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const ProductStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Menu" component={Menu}/>
    <Stack.Screen name="Compra_Producto" component={Compra_Producto}/>
    <Stack.Screen name="Registrar_producto" component={Registrar_producto}/>
    <Stack.Screen name="Ventas" component={Ventas}/>
  </Stack.Navigator>
);

const MainTabsAdmi = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#009929',
      tabBarInactiveTintColor: '#888',
      headerStyle: {
        backgroundColor: '#009929',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Tab.Screen
      name="Menu"
      component={Menu}
      options={{
        title: 'Lista Productos',
        tabBarLabel: 'Informe Inventario',
        tabBarIcon: ({ color, size }) => (
          <Icon name="paper-plane-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Registrar_producto"
      component={Registrar_producto}
      options={{
        title: 'Registrar producto',
        tabBarLabel: 'Registrar producto',
        tabBarIcon: ({ color, size }) => (
          <Icon name="cube-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Compra_Producto"
      component={Compra_Producto}
      options={{
        title: 'Compra de Producto',
        tabBarLabel: 'Compra de Producto',
        tabBarIcon: ({ color, size }) => (
          <Icon name="stats-chart-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Ventas"
      component={Ventas}
      options={{
        title: 'Ventas',
        tabBarLabel: 'Ventas',
        tabBarIcon: ({ color, size }) => (
          <Icon name="cash-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabsAdmi" component={MainTabsAdmi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
