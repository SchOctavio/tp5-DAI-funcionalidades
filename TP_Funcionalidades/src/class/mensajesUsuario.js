import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Vibration } from "react-native";


const AvisarError=(mensaje)=>{
    ("ERROR", mensaje);
    Vibration.vibrate();
}


export default AvisarError;