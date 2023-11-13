import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Configuracion from './src/screens/configuracionScreen';
import AcercaDe from './src/screens/AcercaDeScren';
import CambioFondo from './src/screens/cambioFondoScreen';
import Multimedia from './src/screens/multimediaScreen';
import Emergencia from './src/screens/emergenciaScreen';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Configuracion'>
        <Stack.Screen
        name="Configuracion"
        component={Configuracion}
        options={{title: 'titulo... Configuración', headerShown: false}}
        />
        <Stack.Screen
        name="Emergencia"
        component={Emergencia}
        options={{title: 'titulo... Emergencia', headerShown: false}}
        />
      <Stack.Screen
        name="AcercaDe"
        component={AcercaDe}
        options={{title:'Titulo ... Acerca de'}}
        />
        <Stack.Screen
        name="CambioFondo"
        component={CambioFondo}
        options={{title:'Titulo ... CambioFondo'}}
        />
        <Stack.Screen
        name="Multimedia"
        component={Multimedia}
        options={{title:'Titulo ... Multimedia'}}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
