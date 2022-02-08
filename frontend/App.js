import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, NavigationContainer,ScrollView, RefreshControl } from 'react-native';
import Cards from './components/Cards.js';



export default function App() {

  return (
    
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Wallet</Text>
        <Cards/>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    margin: 15,
  },
  header: {
    fontSize:40,
    fontWeight:'600',
    fontFamily: 'Helvetica',
    marginTop: 30,
    marginBottom: 15,
  },
  addcontainer:{
    flex:1,
    alignItems:'center',
    marginTop: 20
  }
});
