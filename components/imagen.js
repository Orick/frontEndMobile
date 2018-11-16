import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { Dimensions, StyleSheet, Image} from 'react-native';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

class Imagen extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectMacetero: '',
      selectPlanta:'',
      imagenDir:''
    };
    this.renderImage = this.renderImage.bind(this);
  }

  componentDidMount(){
    const { navigation } = this.props;
    let idMac = navigation.getParam('idMaceteroSelec', 'NoId');
    let nombrePlant = navigation.getParam('plantaNombre', 'NoNombre');
    let dirImagen = navigation.getParam('imagenRuta', 'NoDir');

    this.setState({
        selectMacetero: idMac,
        selectPlanta: nombrePlant,
        imagenDir: dirImagen
    });
  }

  renderImage(){
    if (this.state.imagenDir != '') {
        return(
            <Content style={styles.container}>
                <Image
                    source={{ uri: this.state.imagenDir }}
                    style={styles.preview}
                />
            </Content>
        );
    }
  }

  render() {
    return (        
    <Container>          
        <Header style={{backgroundColor: '#32CD32', height: 50}}>
            <Left>
                <Icon name='arrow-back' style={{color: 'white'}} onPress={()=>this.props.navigation.goBack()}/>
            </Left>
            <Body>
                <Title style={styles.titulo}>Fotos de {this.state.selectPlanta}</Title>
            </Body>
        </Header>

        {this.renderImage()}
    </Container> 
    );
  }
}

const styles = StyleSheet.create({
    titulo: {
        textAlign: 'left',
        color: 'white',
    },
    container: {
        backgroundColor: 'white'
    },
    preview: {
        width: width,
        height: height-74,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        alignSelf: 'center',
        marginLeft:20,
        marginBottom:20
    }
});

export default Imagen;