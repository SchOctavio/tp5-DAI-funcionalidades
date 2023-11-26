import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
//import appStyles from '../styles/appStyles.js';

export default function ImageScreen({ route, navigation }) {

  const imageUri = route?.params?.imageUri || null;
  console.log('Image URI recibida:', imageUri);
  return (
    <View style={styles.container}>
      {imageUri ? (
        <>
          <Image source={{ uri: imageUri }} style={styles.image}/>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <Text>No se ha proporcionado una imagen para mostrar.</Text>
      )}
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
});