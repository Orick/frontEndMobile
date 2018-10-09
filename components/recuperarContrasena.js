import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';
const {width} = Dimensions.get('window');

class recuperarContrasena extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            visibleUpdate: false,
            textUpdate: ''
        };
        this.recuperar = this.recuperar.bind(this);
        
    }
    recuperar(){
        firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
            this.setState({
                visibleUpdate: true,
                textUpdate: 'Se ha enviado un correo con las instrucciones'
            });
        }).catch((error) => {
            this.setState({
                visibleUpdate: true,
                textUpdate: 'Error inesperado, intente mas tarde'
            });
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
                    </Form>
                    <Button rounded success style={styles.buttons}onPress={() => {this.recuperar()} } >
                        <Text>Recuperar</Text>
                    </Button>
                    <Button onPress={() => {this.props.navigation.goBack()} }>
                        <Text>Volver</Text>
                    </Button>
                    <Text hide={this.state.visibleUpdate}>{this.state.textUpdate}</Text>
                </Content>
            </Container>
        );
    }
}


{/* <Container style= {{backgroundColor:'#00b359'}}>
<Content>
    <Form>
        <Input 
            placeholder="Email" 
            style={styles.text}
            onChangeText={(text) => this.setState({email:text})}
        />
    </Form>
    <Button rounded success style={styles.buttons}onPress={() => {this.recuperar()} } >
        <Text>Recuperar</Text>
    </Button>
    <Button onPress={() => {this.props.navigation.goBack()} }>
        <Text>Volver</Text>
    </Button>
    <Text hide={this.state.visibleUpdate}>{this.state.textUpdate}</Text>

</Content>
</Container> */}
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

export default recuperarContrasena;