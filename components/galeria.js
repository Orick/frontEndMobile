import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Text, Button, Icon, Title, Thumbnail } from 'native-base';
import { Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { StackActions, NavigationActions } from 'react-navigation';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const dirs = RNFetchBlob.fs.dirs

class Galeria extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectMacetero: '',
      selectPlanta:'',
      imagesArr:[]
    };
    this.renderGalery = this.renderGalery.bind(this);
  }

  componentDidMount(){
    const { navigation } = this.props;
    let idMac = navigation.getParam('idMaceteroSelec', 'NoId');
    let nombrePlant = navigation.getParam('plantaNombre', 'NoNombre');

    this.setState({
        selectMacetero: idMac,
        selectPlanta: nombrePlant
    });

    RNFetchBlob.fs.isDir(dirs.DCIMDir + '/SmartCetero')
    .then((isDir) => {
        if (isDir == false) {
            RNFetchBlob.fs.mkdir(dirs.DCIMDir + '/SmartCetero')
            .then((res) => {})
            .catch((error) => {
                console.log(error);
            });

            RNFetchBlob.fs.mkdir(dirs.DCIMDir + '/SmartCetero/' + idMac)
            .then((res) => {})
            .catch((error) => {
                console.log('No existe la carpeta SmartCetero');
                console.log(error);
            });
        }else{
            RNFetchBlob.fs.isDir(dirs.DCIMDir + '/SmartCetero/' + idMac)
            .then((isDir) => {
                if (isDir == false) {
                    RNFetchBlob.fs.mkdir(dirs.DCIMDir + '/SmartCetero/' + idMac)
                    .then((res) => {})
                    .catch((error) => {
                        console.log('Existe la carpeta SmartCetero');
                        console.log(error); 
                    });
                }
            })
        }
    })

    let foldermac_dir = dirs.DCIMDir + '/SmartCetero/' + idMac;

    RNFetchBlob.fs.ls(foldermac_dir)
    .then((files) => {

        this.setState({
            imagesArr: this.state.imagesArr.concat(files)
        });

        let file_dir = foldermac_dir + '/' + (files[files.length-1]).toString();
        console.log('file://' + file_dir);
    })
  }

  renderGalery() {
      return this.state.imagesArr.map((data,index) => {
        return (
          <Thumbnail
          key={index}
          square large
          source={{ uri: 'file://' + dirs.DCIMDir + '/SmartCetero/' + this.state.selectMacetero + '/' + data }}
          style={styles.preview}
          />
        )
      })
  }

  render() {
    return (        
    <Container>          
        <Header style={{backgroundColor: '#32CD32'}}>
            <Left>
                <Icon name='arrow-back' style={{color: 'white'}} onPress={()=>this.props.navigation.goBack()}/>
            </Left>
            <Body>
                <Title style={styles.titulo}>Fotos de {this.state.selectPlanta}</Title>
            </Body>
        </Header>

        <Content contentContainerStyle={styles.imageContainer}>
            {this.renderGalery()}
        </Content>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate('fotos',{ idMaceteroSelec: this.state.selectMacetero, plantaNombre: this.state.selectPlanta});}} style = {styles.capture}>
            <Image source={require('./../src/img/camera_button.png')} style={{height:80,width:80}}/>
        </TouchableOpacity>
    </Container> 
    );
  }
}

const styles = StyleSheet.create({
    titulo: {
        textAlign: 'left',
        color: 'white',
    },
    imageContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        width:width
    },
    preview: {
        position: 'relative',
        margin: 5
    },
    capture: {
        position: 'absolute',
        alignSelf: 'flex-start',
        bottom: 0,
        marginLeft:20,
        marginBottom:20
    }
});

export default Galeria;