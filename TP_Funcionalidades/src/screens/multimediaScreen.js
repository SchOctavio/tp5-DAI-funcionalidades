import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import BotonReutilizable from '../components/botonReutilizable';
import InfoService from '../class/infoService';
import { Video, ResizeMode, Audio } from 'expo-av';

export default function Multimedia({ navigation }) {

  const videoRef = useRef(null);
  const [status, setStatus] = React.useState({});
  const [video, setVideo] = useState(null);
  const [musica, setMusica] = useState(null);
  const [sonido, setSonido] = useState();
  const [sonidoReproduciendo, setSonidoReproduciendo] = useState(false);


  const traerInfo = async () => {
    let info = await InfoService.obtenerCredenciales();
    console.log("la info de async storage", info);
    await setVideo(info.url);
    await setMusica(info.musica);
  }

  useEffect(() => {
    traerInfo();
  }, []);

  useEffect(() => {
    if (sonido) {
      reproducirSonido();
    }
  }, [sonido]);

  const reproducirMusica = async () => {
    console.log("contenido de sonido:", sonido);
    if (sonidoReproduciendo && sonido) {
      setSonidoReproduciendo(false);
      console.log('Unloading Sound');
      await sonido.pauseAsync();
      sonido.unloadAsync();
    } else {
      setSonidoReproduciendo(true);
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({ uri: musica }, { volume: 0.8 });
      setSonido(sound);
    }
  }
  const reproducirSonido = async () => {
    setSonidoReproduciendo(true)
    await sonido.playAsync();
  }

  return (
    <SafeAreaView style={styles.container}>
      {video ? (
        <>
          <Video
            style={styles.video}
            ref={videoRef}
            source={{
              uri: video,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <BotonReutilizable onPress={() => status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()} titulo={status.isPlaying ? 'Pausar video' : 'Reproducir video'} style={styles.button1} />

        </>
      ) : (
        <>
          <Text style={{ backgroundColor: 'white', fontSize: 15, width: '80%', textAlign: 'center' }}>No cargaste la url</Text>
        </>
      )}
      

      {musica ? (
        <>
         
          <BotonReutilizable onPress={reproducirMusica} style={styles.boton} texto={sonidoReproduciendo ? 'Pausar audio' : 'Reproducir audio'}  />
        </>
      ) : (
        <>
          
          <Text style={{ backgroundColor: 'white', fontSize: 15, width: '80%', textAlign: 'center' }}>No cargaste ningún audio</Text>
        </>
      )}



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
  boton:{
    width: "75%",
    backgroundColor: "#D4AF37",
    paddingVertical: 12,
    marginTop: 15,
    marginBottom: 15,
  },
  video: {
    width: '80%',
    height: 200
  }
});