import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';
const {width} = Dimensions.get('window');

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass : '',
            // modalVisibleRecordar: false,
            // modalVisibleCrear: false
        };
        
        this.logear = this.logear.bind(this);
        this.desLogear = this.desLogear.bind(this);
        // this.mostrarRecordarContrasena = this.mostrarRecordarContrasena.bind(this);
        // this.mostrarCrearUsuario = this.mostrarCrearUsuario.bind(this);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if(user){
                console.log('logeado');
            }else{
                console.log('No logeado');
            }
        });
    }
  
    // mostrarRecordarContrasena(visible){
    //     this.setState({modalVisibleRecordar: visible});
    // }
    // mostrarCrearUsuario(visible){
    //     this.setState({modalVisibleCrear: visible});
    // }

  logear(){
    console.log(this.state.email, this.state.pass);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
        .then(goodLogin => {
            console.log('User -->',goodLogin);
            goodLogin.user.reload();
            goodLogin.user.getIdToken()
                .then(Token => {
                    console.log("Token -->", Token);
                    this.props.navigation.navigate('Main');
                }).catch(function (error) {
                    console.log('error sacando token');
                    console.log('error: ', error);
                });
        })
        .catch(error => {
            console.log('error Logeando');
            console.log(error);
        });
  }

  desLogear(){
        firebase.auth().signOut()
            .then( ok => {
                console.log('DESLOG -->',ok);
            })
            .catch( error => {
                console.log('ERROR -->',error);
        });
  }

  render() {
    return (
    <Container>
        <Image source={require('./../src/img/fondo.jpg')} style={styles.fondo}/>
        <Content>
            <Image source={require('./../src/img/logo.png')} style={styles.logo}/>
            <Form>
                <Content style={styles.contenedorTexto}>
                <Image source={require('./../src/img/email.png')} style={styles.emailPass}/>
                <Input 
                    placeholder="Usuario" 
                    style={styles.text}
                    onChangeText={(text) => this.setState({email:text})}
                />
                </Content>

                <Content style={styles.contenedorTexto}>
                <Image source={require('./../src/img/pass.png')} style={styles.emailPass}/>
                <Input 
                    placeholder="Contraseña" 
                    style={styles.text}
                    onChangeText={(text) => this.setState({pass:text})}
                />
                </Content>
            </Form>
            <Button rounded success style={styles.buttons}onPress={() => {this.logear()} } >
                <Text>Logear</Text>
            </Button>
            <Content style={{flex: 1}}>
                <Button style={styles.crear} transparent light onPress={() => { this.props.navigation.push('crearUsuario'); }}>
                    <Text>Crear Usuario</Text>
                </Button>

                <Button style={styles.recordar} transparent light onPress={() => { this.props.navigation.push('recuperarContrasena'); }}>
                    <Text>Recordar Contraseña</Text>
                </Button>
            </Content>
            <Button onPress={() => {this.desLogear()} }>
            <Text>Deslogear</Text>
            </Button>
        </Content>
    </Container>
    );
  }
}


{/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisibleCrear}
          onRequestClose={() => {
            
          }}>
          <Content style={{marginTop: 22}}>
              <Text>Crear USUARIO!</Text>
              <Button
                onPress={() => {
                  this.mostrarCrearUsuario(!this.state.modalVisibleCrear);
                }}>
                <Text>Hide Modal</Text>
              </Button>
          </Content>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisibleRecordar}
          onRequestClose={() => {
            
          }}>
          <Content style={{marginTop: 22}}>
              <Text>Recordar Contraseña!</Text>
              <Button
                onPress={() => {
                  this.mostrarRecordarContrasena(!this.state.modalVisibleRecordar);
                }}>
                <Text>Hide Modal</Text>
              </Button>
          </Content>
        </Modal> */}





{/* <Button transparent light onPress={() => { this.mostrarCrearUsuario(true); }}>
                <Text>Crear Usuario</Text>
            </Button> */}

{/* <Button transparent light onPress={() => { this.mostrarRecordarContrasena(true); }}>
                <Text>Recordar Contraseña</Text>
            </Button> */}
{/* <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Email"
          onChangeText={(text) => this.setState({email:text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(text) => this.setState({pass:text})}
        />
        <Button onPress={() => {this.logear()} } title="Logear" />
        <Button onPress={() => {this.desLogear()} } title="DES Logear" />
</View> */}

const styles = StyleSheet.create({
    contenedorTexto:{
        opacity: 0.8,
        backgroundColor: '#32CD32',
        borderRadius: 25,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15
    },
    emailPass:{
        position:"absolute",
        marginLeft: 10,
        marginTop: 5,
        height: 40,
        width: 40 
    },
    text: {
        marginLeft: 50,
        color:'black'
    },
    buttons: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
    },
    logo: {
        height: 200, 
        width: 200,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20 
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
    recordar:{
        width: width/2-1,
        position:"absolute",
        right: 0,
        paddingRight:-20
    },
    crear:{
        width: width/2-1
    }
});

export default Login;

// /Users/alvarogutierrez/Library/Android/sdk/emulator/emulator -avd bestEmu
// react-native log-android