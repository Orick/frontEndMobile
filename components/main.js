import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title,  Drawer } from 'native-base';
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
          <Header>
            <Left>
              <Button transparent onPress={()=>this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>SMartCetero</Title>
            </Body>
          </Header>
        </Drawer>
      </Container>
    );
  }
}

export default Main;