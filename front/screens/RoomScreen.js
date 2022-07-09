import { View, Text, ImageBackground,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import React, { useState } from 'react';
import randomCodeGenerator from '../utils/randomCodeGenerator';
import { SafeAreaView } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import {makeid} from '../utils/randomCodeGenerator';

const SOCKET_URL ='http://192.249.18.107:443';

function RoomScreen({ route, navigation }) {
    const [roomCode, setRoomCode] = useState('');
    
    const socket = io.connect(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
    });
    
    const moveToSelect = () =>{
        setRoomCode(makeid());
        navigation.navigate('Select',{roomCode: roomCode});
    }

    socket.emit("chatting", "from front");

    return (
        <ImageBackground source={require('../public/images/roomback.png')} style={styles.image}>
            <View style={{flex: 1}}>
            </View>
            <View style={{flex: 10}}>
                <View style={styles.card}>
                    <Text style={styles.heading}>User Name:</Text>
                    <Text style={styles.heading}>{route.params.userName}</Text>
                </View>
            </View>
            <View style={{flex: 4, alignItems: 'flex-end'}}>
                <TextInput style={styles.input} placeholder = "Game Code" onChange={(event) => setRoomCode(event.target.value)}></TextInput>
                
                <TouchableOpacity style={styles.buttonAlt}>
                    <Text style={styles.buttonAltText}>JOIN GAME</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.buttonAlt} onPress={moveToSelect}>
                    <Text style={styles.buttonAltText}>CREATE GAME</Text>
                </TouchableOpacity>
            </View>
            

            

        </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
    },  
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '40%',
        marginTop: '15%',
        borderRadius: 20,
        maxHeight: 150,
        paddingBottom: '30%',
        marginLeft: 30,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '38%',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 20, 
        minHeight: 40,
        paddingLeft:20,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '40%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'red',
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
  }); 

  

  export default RoomScreen;
