import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { AppRegistry, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import firebase from 'react-native-firebase';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

class Fotos extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectMacetero: '',
      selectPlanta:''
    };
    this.takePicture = this.takePicture.bind(this);
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

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };

  render() {
    return (        
    <Container>          
        <Header style={{backgroundColor: '#32CD32', height: 50}}>
            <Left>
                <Icon name='arrow-back' style={{color: 'white'}} onPress={()=>this.props.navigation.goBack()}/>
            </Left>
            <Body>
                <Title style={styles.titulo}>Foto para {this.state.selectPlanta}</Title>
            </Body>
        </Header>

        <Content style={styles.container}>
            <RNCamera
                ref={(cam) => {
                    this.camera = cam;
                }}
                style = {styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                permissionDialogTitle={'Permisos de camara'}
                permissionDialogMessage={'Se requieren permisos para usar la camara'}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes)
                }}
            >
            <TouchableOpacity onPress={() => {this.takePicture()}} style = {styles.capture}>
                <Image source={require('./../src/img/camera_button.png')} style={{height:80,width:80}}/>
            </TouchableOpacity>
            </RNCamera>
        </Content>
    </Container> 
    );
  }
}

const styles = StyleSheet.create({
    titulo: {
        textAlign: 'left',
        color: 'white',
    },
    container: {
        backgroundColor: 'white'
    },
    preview: {
        width: width,
        height: height-74,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        alignSelf: 'flex-start',
        marginLeft:20,
        marginBottom:20
    }
});

export default Fotos;