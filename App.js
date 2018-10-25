import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base';

import Login from './components/login';
import Main from './components/main';
import Notification from './components/notification';
import recuperarContrasena from './components/recuperarContrasena';
import crearUsuario from './components/crearUsuario';
import agregarplanta from './components/agregarplanta';
import agregarPlantaForm from './components/agregarPlantaForm';
import bluetooth from './components/bluetooth';

import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu TEST'+
//     '22222',
// });

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body style={{alignItems: 'center'}}>
        <Image
          style={styles.drawerImage}
          source={require('./src/img/logo.png')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const DrawerNav = createDrawerNavigator(
  {
    Main,
    Notification,
    agregarplanta,
    agregarPlantaForm,
    Login
  },
  {
    initialRouteName: 'Main',
    contentComponent: CustomDrawerContentComponent,
    headerMode: 'none'
  }
);

const Navigate = createStackNavigator(
  {
    DrawerNav,
    Login,
    recuperarContrasena,
    crearUsuario,
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
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }
});
