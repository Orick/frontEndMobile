import React, {Component} from 'react';
import {StyleSheet, Image, ListView, ScrollView, View, NativeEventEmitter, NativeModules, Platform, PermissionsAndroid, AppState, Dimensions } from 'react-native';
import { Container, Content, Form, Item, Picker, Input, Label, Button, Text, Icon } from 'native-base';
const {width} = Dimensions.get('window');
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';

import BleManager from 'react-native-ble-manager';
import { stringToBytes } from 'convert-string';

const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


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
            idPlanta: [],
            humedadOptima: [],
            scanning:false,
            peripherals: new Map(),
            appState: '',
            valor: null,
            datos: ''
        };
        this.agregarMacetero = this.agregarMacetero.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.plantasList = this.plantasList.bind(this);

        //bluetooth
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
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

                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Main' })],
                    });
                    this.props.navigation.dispatch(resetAction);
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
        let humedadOptima = [];
        fetch('http://142.93.125.238/planta/all')
            .then(res => res.json())
            .then(result => {
                result.data.map(valor => {
                    tipoplanta.push(valor.tipoPlanta);
                    idplanta.push(valor.id);
                    humedadOptima.push(valor.humedadOptima);
                });
                this.setState({
                    tipoPlanta: tipoplanta,
                    idPlanta: idplanta,
                    humedadOptima: humedadOptima,
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

      componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    
        BleManager.start({showAlert: false});
    
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
    
    
    
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("Permission is OK");
                } else {
                  PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                    if (result) {
                      console.log("User accept");
                    } else {
                      console.log("User refuse");
                    }
                  });
                }
          });
        }
    
      }
    
      handleAppStateChange(nextAppState) {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground!')
          BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
            console.log('Connected peripherals: ' + peripheralsArray.length);
          });
        }
        this.setState({appState: nextAppState});
      }
    
      componentWillUnmount() {
        this.handlerDiscover.remove();
        this.handlerStop.remove();
        this.handlerDisconnect.remove();
        this.handlerUpdate.remove();
      }
    
      handleDisconnectedPeripheral(data) {
        let peripherals = this.state.peripherals;
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
          peripheral.connected = false;
          peripherals.set(peripheral.id, peripheral);
          this.setState({peripherals});
        }
        console.log('Disconnected from ' + data.peripheral);
      }
    
      handleUpdateValueForCharacteristic(data) {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
      }
    
      handleStopScan() {
        console.log('Scan is stopped');
        this.setState({ scanning: false });
      }
    
      startScan() {
        if (!this.state.scanning) {
          this.setState({peripherals: new Map()});
          BleManager.scan([], 3, true).then((results) => {
            console.log('Scanning...');
            this.setState({scanning:true});
          });
        }
      }
    
      retrieveConnected(){
        BleManager.getConnectedPeripherals([]).then((results) => {
          if (results.length == 0) {
            console.log('No connected peripherals')
          }
          console.log(results);
          var peripherals = this.state.peripherals;
          for (var i = 0; i < results.length; i++) {
            var peripheral = results[i];
            peripheral.connected = true;
            peripherals.set(peripheral.id, peripheral);
            this.setState({ peripherals });
          }
        });
      }
    
      handleDiscoverPeripheral(peripheral){
        var peripherals = this.state.peripherals;
        if (!peripherals.has(peripheral.id)){
          console.log('Got ble peripheral', peripheral);
          peripherals.set(peripheral.id, peripheral);
          this.setState({ peripherals })
        }
      }
    
      test(peripheral) {
        firebase.auth().onAuthStateChanged((getuser) => {
            if(getuser){
                getuser.getIdToken()
                .then(Token => {
        if (peripheral){
          if (peripheral.connected){
            BleManager.disconnect(peripheral.id);
          }else{
            BleManager.connect(peripheral.id).then(() => {
              let peripherals = this.state.peripherals;
              let p = peripherals.get(peripheral.id);
              if (p) {
                p.connected = true;
                peripherals.set(peripheral.id, p);
                this.setState({peripherals});
              }
              console.log('Connected to ' + peripheral.id);
    
    
              setTimeout(() => {
                BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                  console.log(peripheralInfo);
                  var service = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
                  var characteristic = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
                  var humedad = 100;
                  var idplantas = this.state.selected;
                   /* return this.state.idPlanta.map(valor,index => {
                    if(valor == idplantas){
                        humedad = this.state.humedadOptima[index];
                    }
                 }); */
                  var str = this.state.nombreRed+":"+this.state.pass+":"+this.state.humedadOptima[this.state.selected - 1];

                  const data = stringToBytes(str);
    
                      setTimeout(() => {
                        BleManager.write(peripheral.id, service, characteristic, data,3000)
                        .then(() => {
                            this.setState({textUsuario:"",textPass:"",textCreate:"Cargando...",valor:1});
                            /* fetch('http://142.93.125.238/macetero/insert',{
                                method: 'POST',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                body: "token="+Token+"&idMacetero="+peripheral.name+"&nombreRed="+this.state.nombreRed+"&passRed="+this.state.pass
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
                
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({ routeName: 'Main' })],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                })
                
                
                            }) */
                          

                        })
                        .catch((error) => {
                          // Failure code
                          this.setState({valor:2})
                        });
    
                      }, 500);
                });
    
              }, 900);
            }).catch((error) => {
              this.setState({valor:4})
            });
          }
        }
    }).catch(function (error) {
        console.log('error sacando token');
        console.log('error: ', error);
        this.setState({valor:5})
    });
        }
    });
      }

    render() {
        const list = Array.from(this.state.peripherals.values());
        const dataSource = ds.cloneWithRows(list);
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

        <Button  onPress={() => this.startScan() }>
          <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
        </Button>
        <Button onPress={() => this.retrieveConnected() }>
          <Text>Retrieve connected peripherals</Text>
        </Button>

        <ScrollView style={styles.scroll}>
          {(list.length == 0) &&
            <View style={{flex:1, margin: 20}}>
              <Text style={{textAlign: 'center'}}>No peripherals</Text>
            </View>
          }
          <Text>{this.state.valor} </Text>
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={(item) => {
              const color = item.connected ? 'green' : '#fff';
              return (
                <Button rounded success style={styles.buttonLogin} onPress={() => this.test(item) }>
                  <View style={[styles.row, {backgroundColor: color}]}>
                    <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
                    <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
                  </View>
                </Button>
              );
            }}
          />
        </ScrollView>

        <Button onPress={() => {this.props.navigation.goBack()} }>
            <Text>Volver</Text>
        </Button>
        
    </Content>
</Container>

        );
  }
}



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
        
    },
    scroll: {
        flex: 1,
        margin: 10,
      },
      row: {
        margin: 10
      },
    
});

export default agregarPlantaForm;