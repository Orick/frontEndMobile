import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Text, Button, Icon, Title, Tab, Tabs, ScrollableTab } from 'native-base';
import { StyleSheet, Image } from 'react-native';
//import SideBar from './sidebar.js';
import Planta from './planta';
import firebase from 'react-native-firebase';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      maceteros: [],
      plantas: [],
      selectMacetero: '',
      currentTab: 0
    };
    this.maceterosList = this.maceterosList.bind(this);
    this.idMaceteroActTab = this.idMaceteroActTab.bind(this);
  }

  /* static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Inicio'
  }) */

  idMaceteroActTab(tab_index) {
    this.setState({
      currentTab: tab_index
    });

    this.setState({
      selectMacetero: this.state.maceteros[tab_index]
    });
  }

  maceterosList() {
      return this.state.maceteros.map((data,index) => {
        return (
          <Tab key={index} heading={this.state.plantas[index]} tabStyle={{backgroundColor: '#32CD32'}}  activeTabStyle={{backgroundColor: '#32CD32'}} textStyle={{color: 'white'}}>
            <Planta idMacetero={data}/>
          </Tab>
        )
      })
  }

  componentWillMount(){
    let user = firebase.auth().currentUser;
    let nombres_m = [];
    let nombres_p = [];
    if (user) {
      fetch('http://142.93.125.238/macetero/maceterosUser/' + user.uid)
      .then(response => response.json())
      .then(result => {
          result.data.map((data,index) => {
            nombres_m.push(data);
          });
          
          let idsMac = '';

          nombres_m.map((data, index) => {
            if (index == nombres_m.length-1) {
              idsMac = idsMac + data
            }else{
              idsMac = idsMac + data + "||"
            }
          });
          
          fetch('http://142.93.125.238/macetero/plantAsigMac/' + idsMac)
          .then(response => response.json())
          .then(result => {
            result.data.map((data,index) => {
              nombres_p.push(data);
            });

            this.setState({
              maceteros: nombres_m,
              plantas: nombres_p
            });

            if (nombres_m.length >= 1) {
              this.setState({
                selectMacetero: nombres_m[0]
              });
            }
          })
          .catch(function (error) {
            console.log('error consultando nombre de la planta');
            console.log('error: ', error);
          });
      })
      .catch(function (error) {
        console.log('error consultando maceteros');
        console.log('error: ', error);
      });
    }
  }
  
  /* Icono a la izquierda del header, antigua funcion onPress={()=>this.props.navigation.openDrawer() */

  render() {
    return (        
      <Container>          
        <Header hasTabs style={{backgroundColor: '#32CD32'}}>
          <Left>
            <Icon name='menu' style={{color: 'white'}} onPress={() => {this.props.navigation.navigate('Menu',{ idMaceteroSelec: this.state.selectMacetero} )} }/>
          </Left>
          <Body>
            <Title style={styles.titulo}>SMartCetero</Title>
          </Body>
        </Header>
        
        <Tabs initialPage={this.state.currentTab} onChangeTab={({ i }) => this.idMaceteroActTab(i)} renderTabBar={()=> <ScrollableTab tabsContainerStyle={{backgroundColor: '#32CD32'}}/>}>
          {this.maceterosList()}

          <Tab key={"agregarTab"} heading={"Agregar Planta"} tabStyle={{backgroundColor: '#32CD32'}}  activeTabStyle={{backgroundColor: '#32CD32'}} textStyle={{color: 'white'}}>
            <Content style={styles.boton}>
              <Button style={styles.boton} onPress={() => { this.props.navigation.push('agregarPlantaForm'); }}>
                  <Image source={require('./../src/img/botonmas.png')} />
              </Button>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  boton:{
      height: 335,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
  },
  titulo: {
    textAlign: 'center',
    color: 'white',
  }
});

export default Main;