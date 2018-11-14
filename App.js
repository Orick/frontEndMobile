import React, {Component} from 'react';

import Login from './components/login';
import Main from './components/main';
import Notification from './components/notification';
import recuperarContrasena from './components/recuperarContrasena';
import crearUsuario from './components/crearUsuario';
import agregarplanta from './components/agregarplanta';
import agregarPlantaForm from './components/agregarPlantaForm';
import Menu from './components/menu';
import eliminarplanta from './components/eliminarplanta';
import fotos from './components/fotos';
import bluetooth from './components/bluetooth';
import editarplanta from './components/editarplanta';
import galeria from './components/galeria';

import { createStackNavigator} from 'react-navigation';

const Navigate = createStackNavigator(
  {
    Main,
    Menu,
    Notification,
    agregarplanta,
    agregarPlantaForm,
    Login,
    recuperarContrasena,
    crearUsuario,
    eliminarplanta,
    editarplanta,
    bluetooth,
    fotos,
    galeria
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
