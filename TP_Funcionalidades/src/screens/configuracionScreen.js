import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, ImageBackground  } from 'react-native';
import React, { useState, useRef, useEffect} from 'react';
import BotonReutilizable from '../components/botonReutilizable';
import InfoService from '../class/infoService';
import Accelerometerr from '../components/Accelerometer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Configuracion({navigation}) {
  const [numero, setNumero] = useState(0);
  const [url, setURL] = useState('');
  const [fondo, setFondo] = useState('');
  const [imagenFondo, setImagenFondo]= useState(null);
  const videoRef = useRef();
  const musicaRef= useRef();

  useEffect(() => {
    cargarFondo();
  }, []);

  const cargarFondo = async () => {
    try {
    if (await InfoService.traerImagenFondo()) { 
      let imagenFondo = await InfoService.traerImagenFondo();
      console.log("imagenFondo", imagenFondo);
      setImagenFondo(imagenFondo);
    }else{
      console.log("CRACK no le cargaste ningun fondo");
    }
  }catch (error){
    console.log("el error:", error);
  }
  }
  
  const ingresarDatos = async ()=>{
    let info={
      numero:numero,
      url:url,
      musica:fondo
    }
    InfoService.almacenarInfo(info);
    navigation.navigate('Emergencia');
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: imagenFondo }} style={styles.fondo}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Numero telefónico"
          onChangeText={(num) => setNumero(num)}
          keyboardType="numeric"
          returnKeyType='next'
          onSubmitEditing={()=>{videoRef.current.focus();}}
        /> 
     </View>
     <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Url video"
          onChangeText={(video) => setURL(video)}
          returnKeyType='next'
          ref={videoRef} 
          onSubmitEditing={()=>{musicaRef.current.focus();}}
        /> 
     </View>
     <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Url musica de fondo"
          onChangeText={(urlFondo) => setFondo(urlFondo)}
          ref={musicaRef} 
         
        /> 
     </View>
    

     <BotonReutilizable
     onPress={ingresarDatos}
     style={styles.loginDiferente}          
     texto="subir perfil"
     />
     </ImageBackground>
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
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  inputView: {
    backgroundColor: "#4b9197",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
 }, 
 fondo:{
  width: '100%',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
});