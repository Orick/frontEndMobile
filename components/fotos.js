import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';

class Fotos extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectMacetero: '',
      selectPlanta:''
    };
  }

  componentWillMount(){
    const { navigation } = this.props;
    let idMac = navigation.getParam('idMaceteroSelec', 'NoId');
    let nombrePlant = navigation.getParam('plantaNombre', 'NoNombre');

    this.setState({
        selectMacetero: idMac,
        selectPlanta: nombrePlant
    });
  }

  render() {
    return (        
    <Container>          
        <Header style={{backgroundColor: '#32CD32'}}>
            <Left>
                <Icon name='arrow-back' style={{color: 'white'}} onPress={()=>this.props.navigation.goBack()}/>
            </Left>
            <Body>
                <Title style={styles.titulo}>Imagenes {this.state.selectPlanta}</Title>
            </Body>
        </Header>

        <Text>{this.state.selectMacetero}</Text>

        <Content style={styles.foto}>
            <TouchableOpacity onPress={ () => {}}>
                <Image source={require('./../src/img/camera_button.png')} style={{height:80,width:80}}/>
            </TouchableOpacity>
        </Content>
    </Container> 
    );
  }
}

const styles = StyleSheet.create({
    boton:{
        height: 335,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    titulo: {
        textAlign: 'center',
        color: 'white',
    },
    foto:{
        height:80,
        width:80,
        position:'absolute', 
        bottom:0,
        marginLeft:20,
        marginBottom:20
    }
});

export default Fotos;