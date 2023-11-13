import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import BotonReutilizable from '../components/botonReutilizable';
import InfoService from '../class/infoService';
import InfoService from '../class/infoService';

export default function Emergencia({navigation}) {
  let info = InfoService.obtenerCredenciales();
  console.log("la info de async storage", info);
  const [numero, setNumero]= useState(info);
  useEffect(() => {
    
    
    // Configura el evento de agitar
    ShakeEventExpo.addListener(() => {
      // Lógica que se ejecutará al agitar el dispositivo
      console.log('¡Dispositivo agitado!');
      // Llama a la función que desees ejecutar al agitar
      // Ejemplo: llama a la función `llamarFuncion` al agitar el dispositivo
      mandarWhatsapp();
    });

    // Limpia el evento cuando el componente se desmonta
    return () => {
      ShakeEventExpo.removeListener();
    };
  }, []);
  const mandarWhatsapp = () => {
    const whatsappNo = "549" + numero
    const whatsappMsg = "hola"
    Linking.openURL(`whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}`);
  }
  return (
    <SafeAreaView style={styles.container}>
      <p>¡Agita tu dispositivo para llamar a la función!</p>
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