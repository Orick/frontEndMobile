import React, { Component } from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import { Container, Content, Form, Item, Picker, Input, Label, Button, Text, Icon } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
const {width} = Dimensions.get('window');

class editarplanta extends Component {
    constructor(props){
      super(props);
      this.state = {
        idMac: '',
        plantaMac: '',
        nombrePersonalizado: '',
        tipoPlanta: [],
        idPlanta: []
      };
      this.editarplanta = this.editarplanta.bind(this);
    }

    plantasList(){
        return this.state.tipoPlanta.map((data,index) => {
            return (
                <Picker.Item key={index} label={data} value={this.state.idPlanta[index]} />
            )
          })
    }

    onValueChange(value) {
        this.setState({
          selected: value
        });
      }
    
    obtenerPlantas(){
        let tipoplanta = [];
        let idplanta = [];
        fetch('http://142.93.125.238/planta/all')
            .then(res => res.json())
            .then(result => {
                result.data.map(valor => {
                    tipoplanta.push(valor.tipoPlanta);
                    idplanta.push(valor.id);
                });
                this.setState({
                    tipoPlanta: tipoplanta,
                    idPlanta: idplanta,
                    selected: idplanta[0]
                  });
            })
            .catch( error => {
                console.log('error sacando token');
                console.log('error: ', error);
            });
    }

    editarplanta () {
        fetch('http://142.93.125.238/macetero/asignarPlanta',{
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: "idMacetero="+this.state.idMac+"&estado=1&nombrePlanta="+this.state.nombrePersonalizado+"&tipoCuidado=1&idPlanta="+this.state.selected
                })
                .then(response => response.json())
                .then(result2 => {
                    this.setState({textCreate: result2.description });
                })
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                this.props.navigation.dispatch(resetAction);
    }

    componentWillMount(){
        const { navigation } = this.props;
        const idMacetero = navigation.getParam('idMacetero', 'SinId');
        const plantaNombre = navigation.getParam('plantaNombre', 'SinNombre');
        this.setState({
            idMac: idMacetero,
            plantaMac: plantaNombre
        });
        this.obtenerPlantas()
        
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
            <Item style={styles.item}>
                <Input 
                    autoCorrect={false}
                    placeholder="Nombre planta" 
                    style={styles.text}
                    onChangeText={(text) => this.setState({nombrePersonalizado:text})}
                />
            </Item>
        
            </Content>

            <Content style={{alignSelf: 'flex-end', height:28}}>
                    <Item style={styles.item}>
                        <Text style={styles.textUsuario}>{this.state.textUsuario}</Text>
                    </Item>
            </Content>

            <Content style={styles.contenedorTexto}>
            
            <Item picker style={styles.item}>
              <Picker
                mode="dropdown"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                {this.plantasList()}
              </Picker>
            </Item>
            </Content>

            <Content style={{alignSelf: 'flex-end', height:28}}>
                    <Item style={styles.item}>
                        <Text style={styles.textUsuario}>{this.state.textUsuario}</Text>
                    </Item>
            </Content>


        </Form>

        <Button rounded success style={styles.buttonLogin} onPress={() => {this.editarplanta()} } >
            <Text>Editar macetero</Text>
        </Button>
        <Content style={{alignSelf: 'center',height:20}}>
            <Item style={styles.item}>
                <Text style={styles.loginInfo}>{this.state.textCreate}</Text>
            </Item>
        </Content>
        <Button onPress={() => {this.props.navigation.goBack()} }>
            <Text>Volver</Text>
        </Button>
        
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
        borderRadius: 25,
        marginLeft: 10,
        marginRight: 10,
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
    buttonLogin:{
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
    recordar:{
        width: width/2-1,
        position:"absolute",
        right: 0,
        paddingLeft:5
    },
    crear:{
        width: width/2-1
    },
    textUsuario:{
        paddingTop:1,
        paddingBottom:4,
        fontSize: 15,
        paddingRight: 20,
        color:'white',
    },
    item:{
        borderColor:'transparent'
    },
    loginInfo:{
        paddingTop:1,
        paddingBottom:8,
        fontSize: 15,
        paddingRight: 20,
        color:'white',
        
    }
    
});

export default editarplanta;