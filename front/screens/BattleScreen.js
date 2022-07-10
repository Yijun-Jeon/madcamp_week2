import { View, Text, ImageBackground,StyleSheet,TouchableOpacity,TextInput, Image,Button,ButtonGroup,ActivityIndicator} from 'react-native';
import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';

const SOCKET_URL ='http://192.249.18.107:443';
let socket
function BattleScreen({ route, navigation }) {
    const roomCode = route.params.roomCode;
    const pokemon_idx = route.params.pokemon_idx
    const username = route.params.username

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

        socket.emit('join', {room: room}, (error) => {
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
    const [player1_pokemon, setPlayer1Pokemon] = useState([])
    const [player2_pokemon, setPlayer2Pokemon] = useState([])
   

    //runs once on component mount
    useEffect(() => {
        //send initial state to server
        socket.emit('initGameState', {
            gameOver: false,
            turn: 'Player 1',
            player1_hp: 500,
            player2_hp: 500,
        })
    }, [])


    useEffect(() => {
        socket.on('initGameState', ({ gameOver, turn, player1_hp, player2_hp, player1_pokemon, player2_pokemon}) => {
            setGameOver(gameOver)
            setTurn(turn)
            setPlayer1Hp(player1_hp)
            setPlayer2Hp(player2_hp)
            setPlayer1Pokemon(player1_pokemon)
            setPlayer2Pokemon(player2_pokemon)
        })

        socket.on('updateGameState', ({ gameOver, winner, turn, player1_hp, player2_hp, currentColor, currentNumber, playedCardsPile, drawCardPile }) => {
            gameOver && setGameOver(gameOver)
            gameOver===true && playGameOverSound()
            winner && setWinner(winner)
            turn && setTurn(turn)
            player1Deck && setPlayer1Deck(player1Deck)
            player2Deck && setPlayer2Deck(player2Deck)
            currentColor && setCurrentColor(currentColor)
            currentNumber && setCurrentNumber(currentNumber)
            playedCardsPile && setPlayedCardsPile(playedCardsPile)
            drawCardPile && setDrawCardPile(drawCardPile)
            setUnoButtonPressed(false)
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users)
        })

        socket.on('currentUserData', ({ name }) => {
            setCurrentUser(name)
            console.log(name)
        })
    }, [])

    const [pokemon, setPokemon] = useState(route.params.pokemon);
    const skill1 = pokemon.skills[0];
    const skill2 = pokemon.skills[1];
    const skill3 = pokemon.skills[2];
    const skill4 = pokemon.skills[3];
    

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.battle} source={require('../public/images/battleback.png')} resizeMode={"stretch"}>
                <View style={{flex: 0.2, alignItems:'center', justifyContent:'flex-end',paddingTop:10}}>
                    <Text style={{fontWeight:'bold', fontSize:15}}>Room Code</Text>
                    <Text style={{}}>{route.params.roomCode}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:20}}>
                    <TouchableOpacity style={styles.hpbar}>
                        <Text style={styles.buttonText}> 100/100 </Text>
                    </TouchableOpacity>
                    <Image style={styles.characterImage} source={require('../public/images/pikachu_battle.gif')}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:50}}>
                    <Image style={styles.characterImage} source={require('../public/images/paili_battle_back.gif')}/>
                    <TouchableOpacity style={styles.hpbar}>
                        <Text style={styles.buttonText}> 100/100 </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

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
