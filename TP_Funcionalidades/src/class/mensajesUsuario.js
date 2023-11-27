import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Vibration, Alert } from "react-native";
import Modals from "../components/modal";

 const AvisarError=(mensaje)=>{
    Alert.alert("ERROR", mensaje,[
    {text: 'OK'}, 
    ]);
    Vibration.vibrate();
}


export default AvisarError;
