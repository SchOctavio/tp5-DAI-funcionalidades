import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Vibration } from "react-native";
import Modals from "../components/modal";

const AvisarError=(mensaje)=>{
    
    Vibration.vibrate();
}


export default AvisarError;