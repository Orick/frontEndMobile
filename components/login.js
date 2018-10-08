import React, {Component} from 'react';
import {StyleSheet, Modal, View, TouchableHighlight} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';


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
    <Container style= {{backgroundColor:'#00b359'}}>
        <Content>
            <Form>
                <Input 
                    placeholder="Usuario" 
                    style={styles.text}
                    onChangeText={(text) => this.setState({email:text})}
                />
                <Input 
                    placeholder="Contraseña"
                    style={styles.text}
                    onChangeText={(text) => this.setState({pass:text})}
                />
            </Form>
            <Button rounded success style={styles.buttons}onPress={() => {this.logear()} } >
                <Text>Logear</Text>
            </Button>

            <Button onPress={() => {this.desLogear()} }>
            <Text>Deslogear</Text>
            </Button>

            <Button transparent light onPress={() => { this.props.navigation.push('crearUsuario'); }}>
                <Text>Crear Usuario</Text>
            </Button>

            <Button transparent light onPress={() => { this.props.navigation.push('recuperarContrasena'); }}>
                <Text>Recordar Contraseña</Text>
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
    text: {
        backgroundColor: '#32CD32',
        borderRadius: 25,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 30,
        opacity: 0.5,
    },
    buttons: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    }
});

export default Login;

// /Users/alvarogutierrez/Library/Android/sdk/emulator/emulator -avd bestEmu
// react-native log-android