import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native';
import { Container, Content, List, ListItem, Text, Header, Body, Left, Icon, Title } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

class Menu extends Component {
    constructor(props){
      super(props);
      this.state = {
        idMacActual: '',
        plantaMacActual: ''
      };
      this.signOut = this.signOut.bind(this);
    }

    componentWillMount(){
        const { navigation } = this.props;
        const idMacetero = navigation.getParam('idMaceteroSelec', 'NoId');
        const plantaMacetero = navigation.getParam('nombrePlantaSelec', 'Noplanta');
        this.setState({
            idMacActual: idMacetero,
            plantaMacActual: plantaMacetero
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
                <Header style={{backgroundColor: '#32CD32'}}>
                    <Left>
                        <Icon name='arrow-back' style={{color: 'white'}} onPress={()=>this.props.navigation.goBack()}/>
                    </Left>
                    <Body>
                        <Title style={styles.titulo}>Opciones</Title>
                    </Body>
                </Header>

                <Content>
                    <List>
                        <ListItem>
                            <Image
                            style={styles.drawerImage}
                            source={require('../src/img/logo.png')} />
                        </ListItem>

                        <ListItem
                        button
                        onPress={() => {this.props.navigation.push('agregarPlantaForm')} }>
                            <Text>Agregar macetero</Text>
                        </ListItem>
                        
                        <ListItem>
                            <Text>Configurar macetero</Text>
                        </ListItem>
                        
                        <ListItem
                        button
                        onPress={() => {this.props.navigation.push("editarplanta",{ idMacetero: this.state.idMacActual, plantaNombre: this.state.plantaMacActual})} }>
                            <Text>Editar macetero</Text>
                        </ListItem>

                        <ListItem
                        button
                        onPress={() => {this.props.navigation.push("eliminarplanta",{ idMacetero: this.state.idMacActual, plantaNombre: this.state.plantaMacActual})} }>
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
      backgroundColor: 'white',
      height: 100
    },
    drawerImage: {
      height: 150,
      width: 150,
      borderRadius: 75,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "auto"
    },
    titulo: {
      textAlign: 'center',
      color: 'white',
    }
});

export default Menu;