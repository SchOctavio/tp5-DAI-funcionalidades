import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, TextInput, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import BotonReutilizable from "../components/botonReutilizable";
import InfoService from "../class/infoService";
import { BarCodeScanner } from "expo-barcode-scanner";


export default function AcercaDe({ navigation }) {
  const [imagenFondo, setImagenFondo] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    cargarFondo();
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const cargarFondo = async () => {
    try {
      if (await InfoService.traerImagenFondo()) {
        let imagenFondo = await InfoService.traerImagenFondo();
        setImagenFondo(imagenFondo);
      } else {
        console.log("CRACK no le cargaste ningun fondo");
      }
    } catch (error) {
      console.log("el error:", error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: imagenFondo }} style={styles.fondo}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <BotonReutilizable
          title={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
        />
      )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  fondo: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
