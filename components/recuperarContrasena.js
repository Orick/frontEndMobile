import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';


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
            <Container style= {{backgroundColor:'#00b359'}}>
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

export default recuperarContrasena;