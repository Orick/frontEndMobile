import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native';
import { Container, Content, List, ListItem, Text, Header, Body } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

class Menu extends Component {
    constructor(props){
      super(props);
      this.state = {
        idMacActual: ''
      };
      this.signOut = this.signOut.bind(this);
    }

    componentWillMount(){
        const { navigation } = this.props;
        const idMacetero = navigation.getParam('idMaceteroSelec', 'NoId');
        this.setState({
            idMacActual: idMacetero
        });
    }

    signOut () {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
          });
          this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (        
            <Container>
                <Header style={styles.drawerHeader}>
                    <Body style={{alignItems: 'center'}}>
                        <Image
                        style={styles.drawerImage}
                        source={require('../src/img/logo.png')} />
                    </Body>
                </Header>

                <Content>
                    <List>
                        <ListItem
                        button
                        onPress={() => {this.props.navigation.push('agregarPlantaForm')} }>
                            <Text>Agregar macetero</Text>
                        </ListItem>
                        
                        <ListItem>
                            <Text>Configurar macetero</Text>
                        </ListItem>
                        
                        <ListItem>
                            <Text>Eliminar macetero</Text>
                        </ListItem>
                        
                        <ListItem
                        button
                        onPress={() => {this.props.navigation.navigate("Notification",{ idMacetero: this.state.idMacActual} )} }>
                            <Text>Ver Notificaciones</Text>
                        </ListItem>
                        
                        <ListItem
                        button
                        onPress={() => {this.signOut()} }>
                            <Text>Cerrar sesion</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    drawerHeader: {
      height: 200,
      backgroundColor: 'white'
    },
    drawerImage: {
      height: 150,
      width: 150,
      borderRadius: 75
    }
});

export default Menu;