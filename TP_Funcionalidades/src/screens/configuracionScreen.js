import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import BotonReutilizable from '../components/botonReutilizable';
import InfoService from '../class/infoService';
import Accelerometerr from '../components/Accelerometer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Configuracion({navigation}) {
  const [numero, setNumero] = useState(0);
  const [url, setURL] = useState('');
  const [fondo, setFondo] = useState('');



  const ingresarDatos = async ()=>{
    let info={
      numero:numero,
      url:url,
      musica:fondo
    }
    InfoService.almacenarInfo(info);
    navigation.navigate('Multimedia');

    
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
 }
});