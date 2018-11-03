import React, { Component } from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import { Container, Content, Left, Right, Text, Button } from 'native-base';
const {width} = Dimensions.get('window');

class eliminarplanta extends Component {
    constructor(props){
      super(props);
      this.state = {
        idMac: '',
        plantaMac: ''
      };
      this.eliminarMacetero = this.eliminarMacetero.bind(this);
    }

    eliminarMacetero () {
        fetch('http://142.93.125.238/macetero/delete',{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "idMacetero="+this.state.idMac
        })
        .then(response => response.json())
        .then(result => {
            console.log('El macetero se elimino')
            console.log(result);
        })
        .catch(function (error) {
            console.log('error eliminando macetero');
            console.log('error: ', error);
        });
        this.props.navigation.goBack();
    }

    componentWillMount(){
        const { navigation } = this.props;
        const idMacetero = navigation.getParam('idMacetero', 'SinId');
        const plantaNombre = navigation.getParam('plantaNombre', 'SinNombre');
        console.log(idMacetero);
        console.log(plantaNombre);

        this.setState({
            idMac: idMacetero,
            plantaMac: plantaNombre
        });
    }

    render() {
        return (        
            <Container>
                <Image source={require('./../src/img/fondo.jpg')} style={styles.fondo}/>
                
                <Content>
                    <Image source={require('./../src/img/logo.png')} style={styles.logo}/>

                    <Content style={styles.contenedorTexto}>
                        <Text style={styles.pregunta}>¿Esta seguro que desea eliminar el macetero con la planta {this.state.plantaMac}?</Text>
                    </Content>

                    <Content>
                        <Button rounded success style={styles.buttonOption} onPress={() => {this.eliminarMacetero()} }>
                            <Text>Eliminar Macetero</Text>
                        </Button>
                        <Button rounded success style={styles.buttonOption} onPress={()=>this.props.navigation.goBack()}>
                            <Text>Volver</Text>
                        </Button>                
                    </Content>
                </Content>

            </Container>
        );
    }
}

{/* <Content>
    <Text>¿Esta seguro de que deseas eliminar el macetero con la planta {this.state.plantaMac}?</Text>
</Content>

<Content>
    <Left><Button><Text>Si</Text></Button></Left>
    <Right><Button><Text>No</Text></Button></Right>
</Content> */}

const styles = StyleSheet.create({
    contenedorTexto:{
        opacity: 0.8,
        backgroundColor: '#32CD32',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    buttonOption:{
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
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
    pregunta:{
        color: 'white',
        marginLeft: 40,
        fontSize: 20
    }    
});

export default eliminarplanta;