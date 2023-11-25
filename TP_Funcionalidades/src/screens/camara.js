import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import BotonReutilizable from "../components/botonReutilizable";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
//import appStyles from '../styles/appStyles.js';
import InfoService from '../class/infoService';

export default function CameraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [imageGaleria, setImageGaleria] = useState("");

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        InfoService.guardarImagenFondo(image); //puede ser que le tenga que mandar asset en vez de image
        alert("¡Foto guardada! 🎉");
        setImage(null);
        console.log("saved successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No tienes acceso a la cámara</Text>;
  }

  return (
    <View style={appStyles.container}>
      <View style={appStyles.topControls}>
        <BotonReutilizable
          onPress={() =>
            setFlash(
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
            )
          }
          icon="flash"
          color={flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"}
        />
      </View>
      {!image ? (
        <Camera
          style={appStyles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <BotonReutilizable
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={appStyles.camera} />
      )}
      <View style={appStyles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <BotonReutilizable
              title="Volver a sacar"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <BotonReutilizable title="GuardarFondo" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <BotonReutilizable title="Sacá una foto" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}