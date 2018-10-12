import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions,TouchableOpacity} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import firebase from 'react-native-firebase';
const {width} = Dimensions.get('window');

//import Planta from './planta';
//<Planta idMacetero={"macetero2"}/>

class Planta extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            indicadorHumedad: 'transparent',
            indicadorLuz: 'transparent',
            indicadorAgua: 'transparent',
            valueHumedad: 0,
            valueLuz: 0,
            valueAgua: 0,
        };
        this.recargar = this.recargar.bind(this);
        this.fotos = this.fotos.bind(this);
    }
    fotos(){
        //this.props.navigation.navigate('Fotos');
    }
    recargar(){
        console.log("CLICK EN IMAGEN");
        firebase.auth().onAuthStateChanged((getuser) => {
            if(getuser){
                getuser.getIdToken()
                        .then(Token => {
                            console.log("Token 2 -->", Token);
                            console.log("token="+Token+"&idMacetero="+this.props.idMacetero);
                            fetch('http://142.93.125.238/sensores/getLast',{
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                    body: "token="+Token+"&idMacetero="+this.props.idMacetero
                                })
                                .then(response => response.json())
                                .then(result => {
                                    console.log("LASTO: ->>", result);
                                    this.setState({
                                        valueHumedad: result.Humedad,
                                        valueLuz: result.Luz,
                                        valueAgua: result.Agua});
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

    //false descargar foto

    componentDidMount(){
        console.log(this.props);
        firebase.auth().onAuthStateChanged((getuser) => {
            if(getuser){
                getuser.getIdToken()
                        .then(Token => {
                            console.log("Token 2 -->", Token);
                            console.log("token="+Token+"&idMacetero="+this.props.idMacetero);
                            fetch('http://142.93.125.238/sensores/getLast',{
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                    body: "token="+Token+"&idMacetero="+this.props.idMacetero
                                })
                                .then(response => response.json())
                                .then(result => {
                                    console.log("LASTO: ->>", result);
                                    this.setState({
                                        valueHumedad: result.Humedad,
                                        valueLuz: result.Luz,
                                        valueAgua: result.Agua});
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
        return (
            <Container style={{flexDirection: 'row'}}>
                <Image source={require('./../src/img/fondo.jpg')} style={styles.fondo}/>

                <Content style={
                    { 
                        borderColor: this.state.indicadorHumedad,
                        borderRadius: 20,
                        borderWidth: 5,
                        height:130,
                        borderColor:'green',
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
                        borderColor: this.state.indicadorLuz,
                        borderRadius: 20,
                        borderWidth: 5,
                        height:130,
                        borderColor:'green',
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
                        borderColor: this.state.indicadorAgua,
                        borderRadius: 20,
                        borderWidth: 5,
                        height:130,
                        borderColor:'red',
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
                        console.log("CLIEN EN IMAGEN RECARGAR");
                        this.recargar();
                    }}>
                        <Image source={require('./../src/img/recargar.png')} style={{height:60,width:60}}/>
                    </TouchableOpacity>
                </Content>
                <Content style={styles.fotos}>
                    <TouchableOpacity onPress={ () => {
                        console.log("CLIEN EN IMAGEN IMAGENES");
                        this.fotos();
                    }}>
                        <Image source={require('./../src/img/imagenes.png')} style={{height:60,width:60}}/>
                    </TouchableOpacity>
                </Content>
                <Text style={{position:'absolute',left: (width/3) - 25, bottom:0,marginBottom:140,fontSize:30, color:'white'}}>Nombre Planta</Text>
                <Text style={{position:'absolute',left: (width/2) - 50, bottom:0,marginBottom:90,fontSize:20,color:'green'}}>Buen estado</Text>

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