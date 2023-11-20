import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, SafeAreaView, TextInput, Linking } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import BotonReutilizable from '../components/botonReutilizable';
import InfoService from '../class/infoService';
import { Accelerometer } from 'expo-sensors';
import ShakeEvent from 'react-native-shake-event';

export default function Emergencia({navigation}) {
  
  
  const [numero, setNumero]= useState(null);
  traerInfo();
  useEffect(() => {
    //Linking.openURL(`whatsapp://send?phone=${numero} &text=te estoy mandando un mensaje`);
    
    // Configura el evento de agitar
    ShakeEvent.addListener(() => {
      Accelerometer.setUpdateInterval(1000);
      // Lógica que se ejecutará al agitar el dispositivo
      console.log('¡Dispositivo agitado!');
      // Llama a la función que desees ejecutar al agitar
      mandarWhatsapp();
    });

    // Limpia el evento cuando el componente se desmonta
    return () => {
      ShakeEventExpo.removeListener();
    };
  }, []);
  const mandarWhatsapp = () => {
    const whatsappNo = "549" + numero
    const whatsappMsg = "hola";
    Linking.openURL(`whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}`);
  }
  const traerInfo= async() =>{
    let info = await InfoService.obtenerCredenciales();
    console.log("la info de async storage", info);
    setNumero(info.numero);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>¡Agita tu dispositivo para llamar a la función!</Text>
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