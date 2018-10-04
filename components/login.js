import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button, View, TextInput} from 'react-native';
import firebase from 'react-native-firebase';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass : ''
        };

        this.logear = this.logear.bind(this);
        this.desLogear = this.desLogear.bind(this);
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if(user){
            console.log('logeado');
        }else{
            console.log('No logeado');
        }
    });
  }
  
  logear(){
    console.log(this.state.email, this.state.pass);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
        .then(goodLogin => {
            console.log('User -->',goodLogin);
            goodLogin.user.reload();
            goodLogin.user.getIdToken()
                .then(Token => {
                    console.log("Token -->", Token);
                    this.props.navigation.navigate('Main');
                }).catch(function (error) {
                    console.log('error sacando token');
                    console.log('error: ', error);
                });
        })
        .catch(error => {
            console.log('error Logeando');
            console.log(error);
        });
  }

  desLogear(){
      firebase.auth().signOut()
        .then( ok => {
            console.log('DESLOG -->',ok);
        })
        .catch( error => {
            console.log('ERROR -->',error);
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Email"
          onChangeText={(text) => this.setState({email:text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(text) => this.setState({pass:text})}
        />
        <Button onPress={() => {this.logear()} } title="Logear" />
        <Button onPress={() => {this.desLogear()} } title="DES Logear" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Login;

// /Users/alvarogutierrez/Library/Android/sdk/emulator/emulator -avd bestEmu
// react-native log-android