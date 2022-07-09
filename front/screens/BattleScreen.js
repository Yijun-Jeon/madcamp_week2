import { View, Text, ImageBackground,StyleSheet,TouchableOpacity,TextInput, Image,Button,ButtonGroup} from 'react-native';
import React, { useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL ='http://192.249.18.107:443';

function BattleScreen({ route, navigation }) {
    const socket = io.connect(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
    });

    const [Pokemon, setPokemon] = useState(0)
    const skill1 = '몸통박치기';
    const skill2 = '전광석화';
    const skill3 = '10만볼트';
    const skill4 = '번개';


    socket.emit("chatting", "from front");

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.battle} source={require('../public/images/battleback.png')} resizeMode={"stretch"} />
            
            <View style={styles.interface}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{skill1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{skill2}</Text>
                    </TouchableOpacity> 
                </View>
                
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{skill3}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{skill4}</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </View>
        // <ImageBackground source={require('../public/images/battleback.png')} style={styles.image} resizeMode='stretch'>

        // </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    battle:{
        flex: 5,
        width: null,
        height: null,    
    },
    interface:{
        flex: 1,
        backgroundColor: '#7FCDD7',
    },
    button: {
        width: '48%',
        backgroundColor: 'black',
        height: 55,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    }
  }); 

  

  export default BattleScreen;