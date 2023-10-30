import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function Configuracion() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Numero telefónico"
          onChangeText={(email) => setEmail(email)}
          returnKeyType='next'
         // onSubmitEditing={()=>{passwordRef.current.focus();}}
        /> 
     </View>
     <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Url video"
          onChangeText={(email) => setEmail(email)}
          returnKeyType='next'
         // onSubmitEditing={()=>{passwordRef.current.focus();}}
        /> 
     </View>
     <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Url musica de fondo"
          onChangeText={(email) => setEmail(email)}
          returnKeyType='next'
         // onSubmitEditing={()=>{passwordRef.current.focus();}}
        /> 
     </View>
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
});