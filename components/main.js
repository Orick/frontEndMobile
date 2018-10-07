import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      pass : ''
    };
    this.list = this.list.bind(this);
  }
  componentWillMount(){
    
  }
  
  list(){

  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => {this.props.navigation.goBack()} } transparent >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}

export default Main;