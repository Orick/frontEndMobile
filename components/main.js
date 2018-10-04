import React, { Component } from 'react';
import { Button, View } from 'react-native';

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
      <View>
        <Button onPress={() => {this.props.navigation.goBack()} } title="Back" />
      </View>
    );
  }
}

export default Main;