import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
const {width} = Dimensions.get('window');


class crearUsuario extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: '',
            visibleCreate: false,
            textCreate: ''
        };
        this.crearUsuario = this.crearUsuario.bind(this);
    }
    crearUsuario(){
        fetch('http://142.93.125.238/user/create',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: "email="+this.state.email+"&password="+this.state.pass
                })
        .then(response => response.json())
        .then(result => {
            this.setState({
                visibleCreate: true,
                textCreate: result.description
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

            <Content style={styles.contenedorTexto}>
            <Image source={require('./../src/img/pass.png')} style={styles.emailPass}/>
            <Input 
                placeholder="Contraseña" 
                style={styles.text}
                onChangeText={(text) => this.setState({pass:text})}
            />
            </Content>
        </Form>
        <Button rounded success style={styles.buttons} onPress={() => {this.crearUsuario()} } >
            <Text>Crear Usuario</Text>
        </Button>
        <Text hide={this.state.visibleCreate}>{this.state.textCreate}</Text>
        <Button onPress={() => {this.props.navigation.goBack()} }>
            <Text>Volver</Text>
        </Button>
        
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
        <Input 
            placeholder="Contraseña"
            style={styles.text}
            onChangeText={(text) => this.setState({pass:text})}
        />
    </Form>
    <Button rounded success style={styles.buttons} onPress={() => {this.crearUsuario()} } >
        <Text>Crear Usuario</Text>
    </Button>
    <Text hide={this.state.visibleCreate}>{this.state.textCreate}</Text>
    <Button onPress={() => {this.props.navigation.goBack()} }>
        <Text>Volver</Text>
    </Button>
</Content>
</Container>
 */}


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

export default crearUsuario;