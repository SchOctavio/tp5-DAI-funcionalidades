import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Linking, ImageBackground } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import ShakeEvent from 'react-native-shake-event';
import Menu from '../components/menu';
import BotonReutilizable from '../components/botonReutilizable';
import InfoService from '../class/infoService';
import AvisarError from '../class/mensajesUsuario';
export default function Emergencia({ navigation }) {

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [numero, setNumero] = useState(null);
  const [imagenFondo, setImagenFondo]= useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  useEffect(() => {
    const fetchData = async () => {
      await traerInfo();
      _subscribe();
      _slow();
    };

    fetchData();
    cargarFondo();
    return () => _unsubscribe();
  }, []);


  const cargarFondo = async () => {
    try {
      if (await InfoService.traerImagenFondo()) {
        let imagenFondo = await InfoService.traerImagenFondo();
        console.log("imagenFondo", imagenFondo);
        setImagenFondo(imagenFondo);
      } else {
        console.log("CRACK no le cargaste ningun fondo");
      }
    } catch (error) {
      console.log("el error:", error);
    }
  }

  const mandarWhatsapp = () => {
    if(numero){
    const whatsappNo = "549" + numero;
    console.log("numero mandar   wpp", numero);
    const whatsappMsg = "hola";
    Linking.openURL(`whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}`);
  }else{
    AvisarError("no ingresaste ningún numero");
  }
  }
  
  const traerInfo = async () => {
    try {
      let info = await InfoService.obtenerCredenciales();
      console.log("la info de async storage", info);
      setNumero(info.numero);
      console.log(parseInt(info.numero));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const _subscribe = () => {
    let auxiliarX;
    setSubscription(Accelerometer.addListener(async (accelerometerData) => {
      auxiliarX = x;
      if (accelerometerData.x < auxiliarX) {
        if ((auxiliarX - accelerometerData.x) > 0.5) {
          mandarWhatsapp();
          console.log("numero if wpp", numero);
        }
      } else {
        if ((accelerometerData.x - auxiliarX) > 0.5) {
          if ((auxiliarX - accelerometerData.x) > 0.5) {
            mandarWhatsapp();
            console.log("numero else wpp", numero);
          }
        }
      }
      setData(accelerometerData);
    }));
  };
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: imagenFondo }} style={styles.fondo}>
        <Text>¡Agita tu dispositivo para llamar a la función!</Text>
        <Menu navigation={navigation}/>

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