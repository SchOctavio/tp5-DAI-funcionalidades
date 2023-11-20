import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import BotonReutilizable from '../components/botonReutilizable';
import InfoService from '../class/infoService';

export default function Multimedia({navigation}) {
  const [video, setVideo]= useState(null);
  const [musica, setMusica]= useState(null);
  traerInfo();


  const traerInfo= async() =>{
    let info = await InfoService.obtenerCredenciales();
    console.log("la info de async storage", info);
    setVideo(info.video);
    setMusica(info.musica);
  }

  return (
    <SafeAreaView style={styles.container}>
      
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