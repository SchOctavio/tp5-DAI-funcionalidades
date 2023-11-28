import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import BotonReutilizable from '../components/botonReutilizable';
import InfoService from '../class/infoService';
import { Video, ResizeMode, Audio } from 'expo-av';
import Menu from '../components/menu';
import AvisarError from '../class/mensajesUsuario';

export default function Multimedia({ navigation }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [video, setVideo] = useState(null);
  const [musica, setMusica] = useState(null);
  const [sonido, setSonido] = useState();
  const [sonidoReproduciendo, setSonidoReproduciendo] = useState(false);
  const [imagenFondo, setImagenFondo] = useState(null);

  const traerInfo = async () => {
    try {
      let info = await InfoService.obtenerInfo();
      console.log("la info de async storage", info);

      if (info) {
        setVideo(info.url);
        setMusica(info.musica);
        if(info.url==null){
          AvisarError("no cargaste el video");
        }
      } else {
        AvisarError("no cargaste ningún dato");
        
      }
    } catch (error) {
      console.log("Error al obtener información:", error);
    }
  }

  useEffect(() => {
    traerInfo();
    cargarFondo();
  }, []);

  useEffect(() => {
    if (sonido) {
      reproducirSonido();
    }
  }, [sonido]);

  const cargarFondo = async () => {
    try {
      let fondo = await InfoService.traerImagenFondo();
      if (fondo) {
        console.log("imagenFondo", fondo);
        setImagenFondo(fondo);
      } else {
        console.log("No se cargó ninguna imagen de fondo.");
      }
    } catch (error) {
      console.log("Error al cargar el fondo:", error);
    }
  }

  const reproducirMusica = async () => {
    try {
      if (sonidoReproduciendo && sonido) {
        setSonidoReproduciendo(false);
        await sonido.pauseAsync();
        await sonido.unloadAsync();
      } else {
        setSonidoReproduciendo(true);
        
        const { sound } = await Audio.Sound.createAsync(
          { uri: musica },
          { volume: 0.8 }
        );
        setSonido(sound);
      }
    } catch (error) {
      console.log("Error al reproducir música:", error);
      AvisarError("la url de la musica es invalida")
    }
  }

  const reproducirSonido = async () => {
    try {
      setSonidoReproduciendo(true);
      await sonido.playAsync();
    } catch (error) {
      console.log("Error al reproducir sonido:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: imagenFondo }} style={styles.fondo}>
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
          </>
        ) : (
          <Text style={{ backgroundColor: 'white', fontSize: 15, width: '80%', textAlign: 'center' }}>No cargaste la url</Text>
        )}

        {musica ? (
          <BotonReutilizable
            onPress={reproducirMusica}
            style={styles.boton}
            texto={sonidoReproduciendo ? 'Pausar audio' : 'Reproducir audio'}
          />
        ) : (
          <Text style={{ backgroundColor: 'white', fontSize: 15, width: '80%', textAlign: 'center' }}>No cargaste ningún audio</Text>
        )}

        <Menu navigation={navigation} />
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
  boton: {
    width: '75%',
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    marginTop: 15,
    marginBottom: 15,
  },
  video: {
    width: '80%',
    height: 250,
  },
  fondo: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
