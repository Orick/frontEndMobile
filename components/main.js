import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title,  Drawer, Tab, Tabs, ScrollableTab } from 'native-base';
import SideBar from './sidebar.js';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      pass : ''
    };
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }
  componentWillMount(){
  }

  closeDrawer(){
    this._drawer._root.close()
  }
  openDrawer(){
    this._drawer._root.open()
  }
  
  render() {    
    return (        
      <Container>
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<SideBar navigator={this._navigator} />}
          onClose={() => this.closeDrawer()} >
          
          <Header hasTabs>
            <Left>
              <Button transparent onPress={()=>this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>SMartCetero</Title>
            </Body>
          </Header>
          
          <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Tab1">
            <Text>Tab 1</Text>
          </Tab>
          <Tab heading="Tab2">
            <Text>Tab 2</Text>
          </Tab>
          <Tab heading="Tab3">
            <Text>Tab 3</Text>
          </Tab>
          <Tab heading="Tab4">
            <Text>Tab 4</Text>
          </Tab>
          <Tab heading="Tab5">
            <Text>Tab 5</Text>
          </Tab>
        </Tabs>
        </Drawer>
      </Container>
    );
  }
}

export default Main;