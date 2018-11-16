import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import firebase from 'react-native-firebase';
import RNFetchBlob from 'rn-fetch-blob';
const dirs = RNFetchBlob.fs.dirs
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const resizeMode = 'center';


class Planta extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            estadoHumedad: 'transparent',
            estadoLuz: 'transparent',
            estadoAgua: 'transparent',
            valueHumedad: '0',
            valueLuz: '0',
            valueAgua: '0',
            estadoPlanta: '',
            imageDir: ''
        };
        this.recargar = this.recargar.bind(this);
        this.estadoplanta =this.estadoplanta.bind(this);
        this.renderImage = this.renderImage.bind(this);
    }

    estadoplanta(hum, luz){
        if(hum && luz){
            return 'Buen estado'
        }
        if(hum || luz){
            return 'Estado regular'
        }
        if(!hum && !luz){
            return 'Mal estado'
        }
    }
    recargar(){
        firebase.auth().onAuthStateChanged((getuser) => {
            if(getuser){
                getuser.getIdToken()
                        .then(Token => {
                            //console.log("token="+Token+"&idMacetero="+this.props.idMacetero);
                            fetch('http://142.93.125.238/sensores/getLast',{
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                    body: "token="+Token+"&idMacetero="+this.props.idMacetero
                                })
                                .then(response => response.json())
                                .then(result => {
                                    //console.log("LASTO: ->>", result);
                                    if(result.status == 1){
                                        this.setState({
                                            valueHumedad: result.Humedad,
                                            valueLuz: result.Luz,
                                            valueAgua: result.Agua,
                                            estadoHumedad: result.estadoHumedad? 'green' : 'red',
                                            estadoLuz: result.estadoLuz? 'green' : 'red',
                                            estadoAgua: result.estadoAgua? 'green' : 'red',
                                            estadoPlanta: this.estadoplanta(result.estadoHumedad,result.estadoLuz)
                                        });
                                    }else{
                                        this.setState({
                                            valueHumedad: 'Sin Datos',
                                            valueLuz: 'Sin Datos',
                                            valueAgua: 'Sin Datos',
                                            estadoHumedad: 'transparent',
                                            estadoLuz: 'transparent',
                                            estadoAgua: 'transparent',
                                            estadoPlanta: ''
                                        });
                                    }
                                    
                                })
                                .catch( error => {
                                    console.log("fetch error : ", error);
                                });
                            
                        }).catch(function (error) {
                            console.log('error sacando token');
                            console.log('error: ', error);
                        });
            }else{
                console.log('No logeado');
            }
        });
    }

    renderImage(){
        if (this.state.imageDir == '') {
            return(
                <Image 
                    source={require('./../src/img/fondo.jpg')} 
                    style={styles.fondo}
                />
            );
        }else{
            return(
                <Image
                    style={styles.fondo_galeria}
                    source={{ uri: this.state.imageDir }}
                />
            );
        }
    }

    componentDidMount(){
        console.log(this.props);
        firebase.auth().onAuthStateChanged((getuser) => {
            if(getuser){
                getuser.getIdToken()
                        .then(Token => {
                            //console.log("token="+Token+"&idMacetero="+this.props.idMacetero);
                            fetch('http://142.93.125.238/sensores/getLast',{
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                    body: "token="+Token+"&idMacetero="+this.props.idMacetero
                                })
                                .then(response => response.json())
                                .then(result => {
                                    //console.log("LASTO: ->>", result);
                                    if(result.status == 1){

                                        let foldermac_dir = dirs.DCIMDir + '/SmartCetero/' + this.props.idMacetero;

                                        RNFetchBlob.fs.ls(foldermac_dir)
                                        .then((files) => {

                                            if (files.length == 0) {
                                                this.setState({
                                                    valueHumedad: result.Humedad,
                                                    valueLuz: result.Luz,
                                                    valueAgua: result.Agua,
                                                    estadoHumedad: result.estadoHumedad? 'green' : 'red',
                                                    estadoLuz: result.estadoLuz? 'green' : 'red',
                                                    estadoAgua: result.estadoAgua? 'green' : 'red',
                                                    estadoPlanta: this.estadoplanta(result.estadoHumedad,result.estadoLuz)
                                                });
                                            }else{
                                                let file_dir = 'file://' + foldermac_dir + '/' + (files[files.length-1]).toString();

                                                this.setState({
                                                    valueHumedad: result.Humedad,
                                                    valueLuz: result.Luz,
                                                    valueAgua: result.Agua,
                                                    estadoHumedad: result.estadoHumedad? 'green' : 'red',
                                                    estadoLuz: result.estadoLuz? 'green' : 'red',
                                                    estadoAgua: result.estadoAgua? 'green' : 'red',
                                                    estadoPlanta: this.estadoplanta(result.estadoHumedad,result.estadoLuz),
                                                    imageDir: file_dir
                                                });
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                    }else{
                                        this.setState({
                                            valueHumedad: 'Sin Datos',
                                            valueLuz: 'Sin Datos',
                                            valueAgua: 'Sin Datos',
                                            estadoHumedad: 'transparent',
                                            estadoLuz: 'transparent',
                                            estadoAgua: 'transparent',
                                            estadoPlanta: ''
                                        });
                                    }
                                    
                                })
                                .catch( error => {
                                    console.log("fetch error : ", error);
                                });
                            
                        }).catch(function (error) {
                            console.log('error sacando token');
                            console.log('error: ', error);
                        });
            }else{
                console.log('No logeado');
            }
        });
    }

    render() {
        console.log(this.state.imageDir);
        return (
            <Container style={{flexDirection: 'row', backgroundColor:'transparent'}}>
                {this.renderImage()}

                <Content style={
                    { 
                        borderColor: this.state.estadoHumedad,
                        borderRadius: 20,
                        borderWidth: 5,
                        height:130,
                        backgroundColor:'white',
                        marginTop: 30,
                        marginRight: 0,
                        marginLeft: 35 
                    }
                }>
                <Image source={require('./../src/img/gota.png')} style={styles.icon}/>
                <Text style={{alignSelf: "center"}}>{this.state.valueHumedad}</Text>
                
                </Content>

                <Content style={
                    { 
                        borderColor: this.state.estadoLuz,
                        borderRadius: 20,
                        borderWidth: 5,
                        height:130,
                        backgroundColor:'white',
                        marginTop: 30,
                        marginRight: 15,
                        marginLeft: 15 
                    }
                }>
                <Image source={require('./../src/img/sol.png')} style={styles.icon}/>
                <Text style={{alignSelf: "center"}}>{this.state.valueLuz}</Text>

                </Content>

                <Content style={
                    { 
                        borderColor: this.state.estadoAgua,
                        borderRadius: 20,
                        borderWidth: 5,
                        height:130,
                        backgroundColor:'white',
                        marginTop: 30,
                        marginRight:35,
                        marginLeft: 0 
                    }
                }>
                <Image source={require('./../src/img/llave.png')} style={styles.iconollave}/>
                <Text style={{alignSelf: "center"}}>{this.state.valueAgua}</Text>
                </Content>

                <Content style={styles.recargar}>
                    <TouchableOpacity onPress={ () => {
                        this.recargar();
                    }}>
                        <Image source={require('./../src/img/recargar.png')} style={{height:60,width:60}}/>
                    </TouchableOpacity>
                </Content>
                <Content style={styles.fotos}>
                    <TouchableOpacity onPress={ () => { this.props.navigation.navigate('galeria',{ idMaceteroSelec: this.props.idMacetero, plantaNombre: this.props.nombrePlanta}); }}>
                        <Image source={require('./../src/img/imagenes.png')} style={{height:60,width:60}}/>
                    </TouchableOpacity>
                </Content>
                <Text style={{position:'absolute',left: (width/3) - 25, bottom:0,marginBottom:100,fontSize:30, color:'white'}}>{this.state.estadoPlanta}</Text>
                

            </Container>
        );
  }
}

const styles = StyleSheet.create({
    indicadoresHumedad:{
        height:130,
        backgroundColor:'green'
    },
    indicadorLuz:{
        height:130,
        backgroundColor:'red'
    },
    indicadoresAgua:{
        height:130,
        backgroundColor:'blue'
    },
    fondo:{
        height: 1000, 
        flex:1,
        position:"absolute",
        transform: [
            { translateX: -250 },
            { translateY: -330 }
          ]
    },
    fondo_galeria:{
        height: height-74,
        width: width,
        position: 'absolute'
    },
    icon:{
        height: 80,
        width:80,
        marginTop:14,
        alignSelf: "center",
    },
    iconollave:{
        height: 79,
        width:64,
        marginTop:15,
        alignSelf: "center",
    },
    recargar:{
        height:60,
        width:60,
        position:'absolute', 
        right:0, 
        bottom:0,
        marginRight:20,
        marginBottom:25
    },
    fotos:{
        height:60,
        width:60,
        position:'absolute', 
        bottom:0,
        marginLeft:20,
        marginBottom:25
    }    
});

export default Planta;