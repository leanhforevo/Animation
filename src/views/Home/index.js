import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from "react-native";
function App({ navigation }) {

  const navigation_Animation1 = () => {
    navigation.navigate('Animation_1')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btna} onPress={navigation_Animation1}>
        <Text style={styles.txt}>Animation 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btna} onPress={() => {
        navigation.navigate('Animation_Tabbar')
      }}>
        <Text style={styles.txt}>Animation Tabbar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btna} onPress={() => {
        navigation.navigate('AR')
      }}>
        <Text style={styles.txt}>AR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btna} onPress={() => {
        navigation.navigate('Login')
      }}>
        <Text style={styles.txt}>Animation Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btna} onPress={() => {
        navigation.navigate('Game')
      }}>
        <Text style={styles.txt}>Game</Text>
      </TouchableOpacity>
    </View>
  );
}


export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center'
  },
  txt: { fontSize: 15, fontWeight: 'bold' },
  btna: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    margin: 15, marginTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8
  }
});
