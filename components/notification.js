import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button, View, TextInput} from 'react-native';
import firebase from 'react-native-firebase';


class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            tipo: [],
            descripcion: [],
            fechaNot: [],
            jsonCompleto: '',
        };

        this.macetero = this.macetero.bind(this);
        this.notificationList = this.notificationList.bind(this);
  }

  componentWillMount(){

  }
  
  notificationList() {

    this.state.jsonCompleto.map((data) => {
      return (
        <View><Text>{data.tipo}, {data.descripcion}, {data.fechaNot}</Text></View>
      )
    })

}

  macetero(idMacetero){
      /*
      "id": 1,
            "tipo": "Humedad",
            "descripcion": "Humedad registrada menor a la humedad óptima",
            "createdAt": "2018-10-07T07:01:30.124Z",
            "updatedAt": "2018-10-07T07:01:30.161Z",
            "plantaAsignadaId": 8
      */
    let tipoarr = [];
    let descripcionarr = [];
    let fechaNotarr = []; 
    fetch('http://142.93.125.238/notificaciones/search',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: "idMacetero="+idMacetero
                })
    .then(response => response.json())
    .then(result => {
        result.data.map(valor => {
            tipoarr.push(valor.tipo);
            descripcionarr.push(valor.descripcion);
            fechaNotarr.push(valor.fechaNot);
        });
      this.setState({
        tipo: tipoarr,
        descripcion: descripcionarr,
        fechaNot: fechaNotarr,
        jsonCompleto: result.data
      });
    })
    .catch( error => {
      console.log("fetch error : ", error);
    });
    /* return(
      <div>
      {this.state.idMacetero}
      </div>
  ); */
  }


  render() {
    const { navigation } = this.props;
    const idMacetero = navigation.getParam('idMacetero', 'Sinnombre');
    return (
      <View >
            <Text> Holi {this.state.tipo[0]}, {this.state.descripcion[0]}, {this.state.fechaNot[0]}</Text>
            <Text> Holi {this.state.tipo[1]}, {this.state.descripcion[1]}, {this.state.fechaNot[1]}</Text>
            <Text> Holi {this.state.tipo[2]}, {this.state.descripcion[2]}, {this.state.fechaNot[2]}</Text>
            <Button onPress={() => {this.macetero(idMacetero)} } title="Macetero" />

      </View>
    );
  }
}

export default Notification;

// /Users/alvarogutierrez/Library/Android/sdk/emulator/emulator -avd bestEmu
// react-native log-android