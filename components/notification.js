import React, {Component} from 'react';
//import {Platform, StyleSheet, Text, Button, View, TextInput} from 'react-native';
import { StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, Thumbnail,Title, Icon } from 'native-base';
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

  /* static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Notificaciones',
    drawerLockMode: 'locked-closed'
  }) */

  componentDidMount(){
    const { navigation } = this.props;
    const idMacetero = navigation.getParam('idMacetero', 'Sinnombre');
    this.macetero(idMacetero);
  }
  
  notificationList() {

    return this.state.tipo.map((data,index) => {
      let Agua = './../src/img/Agua2.png';
      let Luz = './../src/img/Luz2.png';
      let Humedad = './../src/img/Humedad2.png';
      let uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
      if(data == 'Agua'){
      return (
          <Card key={index}>
            <CardItem header>
            <Text style={styles.text}> {this.state.fechaNot[index].slice(0,10)} </Text>  
            <Image source={require(Agua)} style={styles.agua}/>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                 {this.state.descripcion[index]}
                </Text>
              </Body>
            </CardItem>
         </Card>

      )
    }
    if(data == 'Humedad'){
      return (
        <Card key={index}>
          <CardItem header>
          <Text style={styles.text}> {this.state.fechaNot[index].slice(0,10)} </Text> 
          <Image source={require(Humedad)} style={styles.humedad}/>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
               {this.state.descripcion[index]}
              </Text>
            </Body>
          </CardItem>
       </Card>

    )
    }
    if(data == 'Luz'){
      return (
        <Card key={index}>
          <CardItem header>
          <Text style={styles.text}> {this.state.fechaNot[index].slice(0,10)}  </Text>
          <Image source={require(Luz)} style={styles.luz}/>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
               {this.state.descripcion[index]}
              </Text>
            </Body>
          </CardItem>
       </Card>

    )
    }
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
            fechaNotarr.push(valor.createdAt);
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
    
    return (
      <Container>
        <Image source={require('./../src/img/fondo.jpg')} style={styles.fondo}/>
        <Header style={styles.background}>
            <Left>
              <Icon name='arrow-back' style={{color: 'white'}} onPress={()=>this.props.navigation.goBack()}/>
            </Left>
            <Body>
              <Title style={styles.titulo}>Notificaciones</Title>
            </Body>
          </Header>
        <Content>
            {this.notificationList()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  fondo:{
      height: 1000, 
      flex:1,
      position:"absolute",
      transform: [
          { translateX: -250 },
          { translateY: -330 }
        ]
  },
  agua:{
    //height: 40, 
    marginLeft: 150,
    //position:"absolute",
  },
  luz:{
    //height: 40, 
    marginLeft: 150,
    //position:"absolute",
  },
  humedad:{
    //height: 40, 
    marginLeft: 180,
    //position:"absolute",
  },
  text: {
    color:'black'
  },
  titulo: {
    textAlign: 'center',
    color: 'white',
  },
  background:{
    backgroundColor: '#32CD32'
  },
});

export default Notification;

// /Users/alvarogutierrez/Library/Android/sdk/emulator/emulator -avd bestEmu
// react-native log-android