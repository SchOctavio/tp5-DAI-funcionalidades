import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//npmi@react-native-async-storage/async-storage
//Definicionesdeconstantes.
const NUMERO_KEY = "KEY_NUMERO"; //
const URL_KEY = "KEY_VIDEO"; //
const FONDO_KEY="KEY_FONDO"
class InfoService {
  

  static almacenarInfo = async (info) => {
    try 
    {    
      await AsyncStorage.setItem(NUMERO_KEY, info.numero);  
      await AsyncStorage.setItem(URL_KEY, info.url);  
      await AsyncStorage.setItem(FONDO_KEY, info.fondo);  
    } 
    catch(e) {    
      // error  
    } 
  };
  static obtenerCredenciales = async () => {
    let  returnValue;
    const storedNumero = await AsyncStorage.getItem(NUMERO_KEY); 
    const storedURL = await AsyncStorage.getItem(URL_KEY);
    const storedFondo = await AsyncStorage.getItem(FONDO_KEY);  


    returnValue = { 
        numero: storedNumero, 
        url: storedURL,
        fondo: storedFondo
    };
    return returnValue;
  };
}
export default InfoService;