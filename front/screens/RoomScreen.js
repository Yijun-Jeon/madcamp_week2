import { View, Text, ImageBackground,StyleSheet,TouchableOpacity,TextInput,Alert,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {makeid} from '../utils/randomCodeGenerator';

const SOCKET_URL ='http://192.249.18.107:443';

function RoomScreen({ route, navigation }) {
    const [roomCode, setRoomCode] = useState('');
    const [roomCodeValid, setRoomCodeValid] = useState(false);
    const [userName,setUserName] = useState(route.params.userName);
    
    const socket = io.connect(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
    });

    const roomCodeHandler = (text) =>{
        if(text.length != 6 || isNaN(text)){
            setRoomCodeValid(false);
        }
        else{
            setRoomCodeValid(true);
            setRoomCode(text);
        }
    }
    const moveToSelect = () =>{
        navigation.navigate('Select',{roomCode: makeid(),userName: userName});
    }
    const moveToLogin = () =>{
        navigation.navigate('Login');
    }
    const joinToSelect = () =>{
        if(roomCodeValid){
            navigation.navigate('Select',{roomCode: roomCode, userName: userName});
        }else{
            Alert.alert(
                "Invalid Room Code!"
            )
        }
    }

    return (
        <ImageBackground source={require('../public/images/roomback.png')} style={styles.image}>
            <View style={{flex: 2,alignItems:'flex-end',justifyContent:'flex-end'}}>
            </View>
            <View style={{flex: 10,flexDirection:'row',justifyContent:'space-between'}}>
                <View style={styles.card}>
                    <Text style={styles.heading}>User Name:</Text>
                    <Text style={[styles.heading,{color:'black'}]}>{userName}</Text>
                </View>
                <TouchableOpacity onPress={moveToLogin} style={{height:40}}>
                    <Image source={require('../public/images/exit.png')} style={{width:70,height:70,marginRight:'4%',marginTop:'3%'}} ></Image>
                </TouchableOpacity>
            </View>
            <View style={{flex: 4, alignItems: 'flex-end',marginBottom:30,marginRight:10}}>
                <TextInput style={styles.input} placeholder = "Game Code" onChangeText={(text) => roomCodeHandler(text)}></TextInput>
                
                <TouchableOpacity style={styles.buttonAlt} onPress={joinToSelect}>
                    <Text style={styles.buttonAltText}>JOIN GAME</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.buttonAlt} onPress={moveToSelect}>
                    <Text style={styles.buttonAltText}>CREATE GAME</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:5,flexDirection:'row'}}>
                <Image source={require('../public/images/pikachu_load.gif')} style={{marginLeft:'18%', width:80,height:80}}></Image>
                <Image source={require('../public/images/digda.gif')} style={{marginLeft:'30%',marginTop:'17%', width:70,height:70}}></Image>
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
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        width: '40%',
        maxHeight: 70,
        justifyContent:'flex-start',
        alignItems: 'center',
        marginLeft: 20,
        maxWidth:150,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '5%',
        color:'blue',
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
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
  }); 

  

  export default RoomScreen;
