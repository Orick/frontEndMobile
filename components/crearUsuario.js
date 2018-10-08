import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';


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
            <Container style= {{backgroundColor:'#00b359'}}>
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
        );
  }
}

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

export default crearUsuario;