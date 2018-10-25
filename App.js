import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Login from './components/login';
import Main from './components/main';
import Notification from './components/notification';
import recuperarContrasena from './components/recuperarContrasena';
import crearUsuario from './components/crearUsuario';

import agregarplanta from './components/agregarplanta';
import agregarPlantaForm from './components/agregarPlantaForm';
import bluetooth from './components/bluetooth';

import { createStackNavigator } from 'react-navigation';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu TEST'+
//     '22222',
// });

const Navigate = createStackNavigator(
  {
    Login,
    Main,
    Notification,
    recuperarContrasena,
    crearUsuario,
    agregarplanta,
    agregarPlantaForm,
    bluetooth
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

export default class App extends Component {
  render() {
    return (
        <Navigate/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
