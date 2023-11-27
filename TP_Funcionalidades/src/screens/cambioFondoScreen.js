import React, {useEffect, useState} from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import InfoService from '../class/infoService';
//import appStyles from '../styles/appStyles.js';

export default function CambioFondo({ navigation, setImageGaleria }) {
  const [imagenFondo, setImagenFondo]= useState(null);

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


  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permisos insuficientes para acceder a la galería de imágenes.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.cancelled) {
        console.log("El usuario canceló la selección");
      } else {
        console.log(result);
        const path = result.assets[0].uri;
        setImageGaleria(path);
        InfoService.guardarImagenFondo(path);
        console.log("Imagen seleccionada:", path);
        navigation.navigate("ImageScreen", { imageUri: path });
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: imagenFondo }} style={styles.fondo}>
      <Text style={styles.text}>Eliga como quiere cambiar el fondo</Text>
      <Button
        title="Abrir Cámara"
        onPress={() => navigation.navigate("Camera")}
      />
      <Button
        title="Seleccionar Imagen"
        onPress={selectImage}
      />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
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
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  controls: {
    flex: 0.5,
  },
  goBackButton: {},
  image: {
    height: 600,
    width: 600,
  },
  fondo:{
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});