import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import { Container, Content, Form, Item, Picker, Input, Label, Button, Text, Icon } from 'native-base';
const {width} = Dimensions.get('window');
import firebase from 'react-native-firebase';


class agregarPlantaForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            idMacetero: '',
            nombreRed: '',
            pass: '',
            textCreate: '',
            textUsuario: "",
            textPass: "",
            nombrePersonalizado: "",
            selected: 0,
            tipoPlanta: [],
            idPlanta: []
        };
        this.agregarMacetero = this.agregarMacetero.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.plantasList = this.plantasList.bind(this);
    }

    plantasList(){
        return this.state.tipoPlanta.map((data,index) => {
            return (
                <Picker.Item label={data} value={this.state.idPlanta[index]} />
                
      
            )
          })
    }

    onValueChange(value) {
        this.setState({
          selected: value
        });
      }

    agregarMacetero(){

        firebase.auth().onAuthStateChanged((getuser) => {
            if(getuser){
                getuser.getIdToken()
                .then(Token => {
            this.setState({textUsuario:"",textPass:"",textCreate:"Cargando..."});
            fetch('http://142.93.125.238/macetero/insert',{
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: "token="+Token+"&idMacetero="+this.state.idMacetero+"&nombreRed="+this.state.nombreRed+"&passRed="+this.state.pass
            })
            .then(response => response.json())
            .then(result => {
                fetch('http://142.93.125.238/macetero/asignarPlanta',{
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: "idMacetero="+this.state.idMacetero+"&estado=1&nombrePlanta="+this.state.nombrePersonalizado+"&tipoCuidado=1&idPlanta="+this.state.selected
                })
                .then(response => response.json())
                .then(result2 => {
                    this.setState({textCreate: result2.description });
                })
        
            })
        }).catch(function (error) {
            console.log('error sacando token');
            console.log('error: ', error);
        });
            }
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

    componentWillMount(){
        this.obtenerPlantas();
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
                    placeholder="Id macetero" 
                    style={styles.text}
                    onChangeText={(text) => this.setState({idMacetero:text})}
                />
            </Item>
        
            </Content>
            
            <Content style={{alignSelf: 'flex-end', height:28}}>
                    <Item style={styles.item}>
                        <Text style={styles.textUsuario}>{this.state.textUsuario}</Text>
                    </Item>
            </Content>

            <Content style={styles.contenedorTexto}>
            <Image source={require('./../src/img/email.png')} style={styles.emailPass}/>
            <Item style={styles.item}>
                <Input 
                    autoCorrect={false}
                    placeholder="Nombre red" 
                    style={styles.text}
                    onChangeText={(text) => this.setState({nombreRed:text})}
                />
            </Item>
        
            </Content>

            <Content style={{alignSelf: 'flex-end', height:28}}>
                    <Item style={styles.item}>
                        <Text style={styles.textUsuario}>{this.state.textUsuario}</Text>
                    </Item>
            </Content>
            
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

            <Content style={styles.contenedorTexto}>
            <Image source={require('./../src/img/pass.png')} style={styles.emailPass}/>
            <Item last style={styles.item}>
                <Input 
                    placeholder="Contraseña red" 
                    style={styles.text}
                    secureTextEntry={true} 
                    onChangeText={(text) => this.setState({pass:text})}
                    >
                </Input>
            </Item>
            </Content>
            
            <Content style={{alignSelf: 'flex-end',height:28}}>
                    <Item style={styles.item}>
                        <Text style={styles.textUsuario}>{this.state.textPass}</Text>
                    </Item>
            </Content>

            <Content>
                <Button onPress={() => {this.props.navigation.push('bluetooth');} }>
                    <Text>Bluetooth</Text>
                </Button>
            </Content>

        </Form>

        <Button rounded success style={styles.buttonLogin} onPress={() => {this.agregarMacetero()} } >
            <Text>Agregar macetero</Text>
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

export default agregarPlantaForm;