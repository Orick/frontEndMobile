import React, {Component} from 'react';
//import {Platform, StyleSheet, Text, Button, View, TextInput} from 'react-native';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Container, Header, Content, Card, Button, CardItem, Text, Body, Left, Right, Thumbnail,Title } from 'native-base';
import firebase from 'react-native-firebase';
const {width} = Dimensions.get('window');


class agregarplanta extends Component {
    constructor(props){
        super(props);
        this.state = {
            tipo: [],
            descripcion: [],
            fechaNot: [],
            jsonCompleto: '',
        };
  }

  componentWillMount(){
  }

  


  render() {
    const { navigation } = this.props;
    
    return (
      <Container>
        <Header hasTabs style={styles.background}>
            <Body>
              <Title style={styles.titulo}>Agregar planta</Title>
            </Body>
          </Header>
        <Content style={styles.boton}>
            <Button style={styles.boton} onPress={() => { this.props.navigation.push('agregarPlantaForm'); }}>
                <Image source={require('./../src/img/botonmas.png')} />
            </Button>
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
  fondo:{
    marginLeft: 500
},
boton:{
    height: 335,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
},
  imagenmas:{
    //height: 1000, 
    //flex:1,
    position:"absolute",
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
    color: 'black',
  },
  background:{
    backgroundColor: '#32CD32'
  },
});

export default agregarplanta;

// /Users/alvarogutierrez/Library/Android/sdk/emulator/emulator -avd bestEmu
// react-native log-android