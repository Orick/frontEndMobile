import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'rn-fetch-blob';
import { StackActions, NavigationActions } from 'react-navigation';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const dirs = RNFetchBlob.fs.dirs

class Fotos extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectMacetero: '',
      selectPlanta:'',
      imagenDir:null
    };
    this.takePicture = this.takePicture.bind(this);
    this.renderCamera = this.renderCamera.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.goBackView = this.goBackView.bind(this);
  }

  componentDidMount(){
    const { navigation } = this.props;
    let idMac = navigation.getParam('idMaceteroSelec', 'NoId');
    let nombrePlant = navigation.getParam('plantaNombre', 'NoNombre');

    this.setState({
        selectMacetero: idMac,
        selectPlanta: nombrePlant
    });
  }

  goBackView(){
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      
      let foldermac_dir = dirs.DCIMDir + '/SmartCetero/' + this.state.selectMacetero;
      
      RNFetchBlob.fs.ls(foldermac_dir)
      .then((files) => {
        let file_dir = foldermac_dir + '/' + (this.state.selectMacetero).toString() + (files.length + 1).toString() + '.jpg';

        RNFetchBlob.fs.cp(data.uri, file_dir)
        .then((res) => {
            console.log('file://' + file_dir);
            this.setState({
                imagenDir: 'file://' + file_dir
            });

            //this.goBackView();
        })
        .catch((error) => { console.log(error); });    
      })
    }
  }

  renderCamera(){
      return(
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
      );
  }

  renderImage(){
    return(
        <Image
            source={{ uri: this.state.imagenDir }}
            style={styles.preview}
        />
    );
  }

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
            {this.state.imagenDir ? this.renderImage() : this.renderCamera()}
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
        alignSelf: 'center',
        marginLeft:20,
        marginBottom:20
    }
});

export default Fotos;