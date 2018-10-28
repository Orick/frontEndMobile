import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title,  Drawer, Tab, Tabs, ScrollableTab } from 'native-base';
//import SideBar from './sidebar.js';
import Planta from './planta';
import firebase from 'react-native-firebase';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      maceteros: [],
      plantas: []
    };
    this.maceterosList = this.maceterosList.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Inicio'
  })

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

            console.log(nombres_m);
            console.log(nombres_p);

            this.setState({
              maceteros: nombres_m,
              plantas: nombres_p
            });
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
  
  render() {
    return (        
      <Container>          
        <Header hasTabs style={{backgroundColor: '#32CD32'}}>
          <Left>
            <Icon name='menu' onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
          <Body>
            <Title>SMartCetero</Title>
          </Body>
        </Header>
        
        <Tabs renderTabBar={()=> <ScrollableTab tabsContainerStyle={{backgroundColor: '#32CD32'}}/>}>
          {this.maceterosList()}
        </Tabs>
      </Container>
    );
  }
}

export default Main;