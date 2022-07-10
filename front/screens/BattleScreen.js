import { View, Text, ImageBackground,StyleSheet,TouchableOpacity,TextInput, Image,Button,ButtonGroup,ActivityIndicator} from 'react-native';
import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import {Pokemon, pokemons} from '..//utils/character/Pokemon'

const SOCKET_URL ='http://192.249.18.107:443';
const blank_path = '../public/images/blank.png'
let socket
function BattleScreen({ route, navigation }) {
    const roomCode = route.params.roomCode;
    const pokemon = route.params.pokemon;
    const username = route.params.username;

    //initialize socket state
    const [room, setRoom] = useState(roomCode)
    const [roomFull, setRoomFull] = useState(false)
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState('')
    
    useEffect(() => {
        const connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        }
        socket = io.connect(SOCKET_URL, connectionOptions)

        socket.emit('join', {room: room, pokemon: pokemon}, (error) => {
            if(error)
                setRoomFull(true)
        })

        //cleanup on component unmount
        return function cleanup() {
            socket.emit('room_disconnect')
            //shut down connnection instance
            socket.off()
        }
    }, [])

    //initialize game state
    const [gameOver, setGameOver] = useState(true)
    const [winner, setWinner] = useState('')
    const [turn, setTurn] = useState('')
    const [player1_hp, setPlayer1Hp] = useState([])
    const [player2_hp, setPlayer2Hp] = useState([])
    const [player1_pokemon, setPlayer1Pokemon] = useState([pokemon])
    const [player2_pokemon, setPlayer2Pokemon] = useState([])


    useEffect(() => {
        socket.on("roomData", ({ users }) => {
            setUsers(users)
            if(users.length==2){
                //console.log("pokemon setting..."+users[0].pokemon.name+users[1].pokemon.name)
                setPlayer1Pokemon(users[0].pokemon)
                setPlayer2Pokemon(users[1].pokemon)
            }
        })
        
        socket.on('currentUserData', ({ name}) => {
            console.log("client currentUserData called: "+name)
            setCurrentUser(name)
        })
    }, [])
    

    // useEffect(()=>{
    //     socket.emit('initGameState',{
    //         gameOver: false,
    //         turn: 'Player 1',
    //         player1_hp: 500,
    //         player2_hp: 500,
    //         player1_pokemon: player1_pokemon,
    //         player2_pokemon: player2_pokemon,
    //     })
    // },[])


    // useEffect(() => {
    //     socket.on('initGameState', ({ gameOver, turn, player1_hp, player2_hp, player1_pokemon, player2_pokemon}) => {
    //         console.log("client initGameState called")
    //         setGameOver(gameOver)
    //         setTurn(turn)
    //         setPlayer1Hp(player1_hp)
    //         setPlayer2Hp(player2_hp)
    //         setPlayer1Pokemon(player1_pokemon)
    //         setPlayer2Pokemon(player2_pokemon)
    //     })

    //     socket.on('updateGameState', ({ gameOver, turn, player1_hp, player2_hp, player1_pokemon, player2_pokemon}) => {
    //         console.log("client updateGame called")
    //         gameOver && setGameOver(gameOver)
    //         turn && setTurn(turn)
    //         player1_hp && setPlayer1Hp(player1_hp)
    //         player2_hp && setPlayer2Hp(player2_hp)
    //         player1_pokemon && setPlayer1Pokemon(player1_pokemon)
    //         player2_pokemon && setPlayer2Pokemon(player2_pokemon)
    //     })
    // }, [])

    //runs once on component mount
    

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.battle} source={require('../public/images/battleback.png')} resizeMode={"stretch"}>
                <View style={{flex: 0.2, alignItems:'center', justifyContent:'flex-end',paddingTop:10}}>    
                    <Text style={{fontWeight:'bold', fontSize:15}}>Room Code</Text>
                    <Text style={{}}>{route.params.roomCode}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:20}}>
                    {users.length==2
                    && <TouchableOpacity style={styles.hpbar}>
                        <Text style={styles.buttonText}> {500*0.5}/{500} </Text>
                        </TouchableOpacity> }
                    {users.length==2
                    && <Image
                            style={styles.characterImage}
                            source={currentUser=='Player 1'?player2_pokemon.imgbattlefront:player1_pokemon.imgbattlefront}/>}
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:50}}>
                    <Image style={styles.characterImage} source={pokemon.imgbattleback}/>
                    <TouchableOpacity style={styles.hpbar}>
                        <Text style={styles.buttonText}> {pokemon.health}/{pokemon.health} </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={styles.interface}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{pokemon.skills[0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{pokemon.skills[1]}</Text>
                    </TouchableOpacity> 
                </View>
                
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{pokemon.skills[2]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{pokemon.skills[3]}</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </View>
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
    hpbar: {
        width: '50%',
        backgroundColor: 'black',
        height: 55,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    characterImage: {
        margin: 30
    }
  }); 

  

  export default BattleScreen;
