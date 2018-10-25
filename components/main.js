import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title,  Drawer, Tab, Tabs, ScrollableTab } from 'native-base';
import SideBar from './sidebar.js';
import Planta from './planta';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      maceteros: [''],
      plantas:['']
    };
    this.maceterosList = this.maceterosList.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Inicio'
  })
  componentWillMount(){
    id_m = ['maceteroaleeh','maceteroaleeh2','maceteroaleeh3','maceteroaleeh3','maceteroaleeh3','maceteroaleeh3'];
    nombres_p = ['Planta 1','Planta 2','Planta 3','Planta 4','Planta 5','Planta 6'];
    
    this.setState({
      maceteros: id_m,
      plantas: nombres_p
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
        
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          {this.maceterosList()}
        </Tabs>
      </Container>
    );
  }
}

export default Main;