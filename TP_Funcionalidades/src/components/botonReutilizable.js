import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
const BotonReutilizable = ({ onPress, style, texto }) => {
    const handleOnPress = ()=>{
       /*console.log("estoy haciendo algo :)");
       let hoy = new Date();
       console.log( "fecha y hora:"+ hoy);*/
       onPress();
      }
  return (
    <TouchableOpacity onPress={handleOnPress} style={[styles.buttonContainer, style]}>
      <Text style={styles.buttonText}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // Estilo predeterminado del botón
    width: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    // Estilo predeterminado del texto del botón
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
export default BotonReutilizable;