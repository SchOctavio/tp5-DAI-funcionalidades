import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import BotonReutilizable from '../components/botonReutilizable';
import InfoService from '../class/infoService';

export default function Configuracion() {
  const [numero, setNumero] = useState(0);
  const [url, setURL] = useState('');
  const [fondo, setFondo] = useState('');

  const ingresarDatos = async ()=>{
    let info={
      numero:numero,
      url:url,
      fondo:fondo
    }
    InfoService.almacenarInfo(info);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Numero telefónico"
          onChangeText={(num) => setNumero(num)}
          keyboardType="numeric"

         // onSubmitEditing={()=>{passwordRef.current.focus();}}
        /> 
     </View>
     <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Url video"
          onChangeText={(video) => setURL(video)}
          returnKeyType='next'
         // onSubmitEditing={()=>{passwordRef.current.focus();}}
        /> 
     </View>
     <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Url musica de fondo"
          onChangeText={(urlFondo) => setFondo(urlFondo)}
          returnKeyType='next'
         // onSubmitEditing={()=>{passwordRef.current.focus();}}
        /> 
     </View>
    

     <BotonReutilizable
     onPress={ingresarDatos}
     style={styles.loginDiferente}          
     texto="subir perfil"
     />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginDiferente: {
    width: "75%",
    backgroundColor: "#D4AF37",
    paddingVertical: 12,
    marginTop: 15,
    marginBottom: 15,
  

  }
});