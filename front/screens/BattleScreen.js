import { View, Text, ImageBackground,StyleSheet,TouchableOpacity,TextInput, Image,Button,ButtonGroup,ActivityIndicator} from 'react-native';
import React, { useState, useEffect, useInsertionEffect} from 'react';
import io from 'socket.io-client';
import {Pokemon, pokemons} from '..//utils/character/Pokemon'

const SOCKET_URL ='http://192.249.18.107:443';
let socket
function BattleScreen({ route, navigation }) {
    const roomCode = route.params.roomCode;
    const [pokemon, setPokemon] = useState(route.params.pokemon);
    //const [pokemon, setPokemon] = useState(pokemons[0]);
    const [pokemonEnemy, setPokemonEnemy] = useState(pokemons[0]);

    const connectionOptions =  {
        "forceNew" : true,
        "reconnectionAttempts": "Infinity", 
        "timeout" : 10000,                  
        "transports" : ["websocket"]
    };

    //initialize game state
    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState('')
    const [turn, setTurn] = useState(1)
    const [player1_hp, setPlayer1Hp] = useState(500)
    const [player2_hp, setPlayer2Hp] = useState(500)
    const [maxHp,setMaxHp] = useState(500)
    const [player1_pokemon, setPlayer1Pokemon] = useState([])
    const [player2_pokemon, setPlayer2Pokemon] = useState([])

    const [myTurn, setMyTurn] = useState('')
    const [start, setStart] = useState(false);

    const skill1 = pokemon.skills[0];
    const skill2 = pokemon.skills[1];
    const skill3 = pokemon.skills[2];
    const skill4 = pokemon.skills[3];

    // 화면 첫 실행, 새로고침
    useEffect(() =>{
        socket = io.connect(SOCKET_URL, connectionOptions)

        setPlayer1Hp(500);
        setPlayer2Hp(500);

        socket.emit('join',{
            room: roomCode,
        });

        socket.on('getMyTurn',({myTurn}) =>{
            setMyTurn(myTurn);
            if(myTurn == 2){
                setStart(true);
            }
        })

    },[])

    useEffect(()=>{
        socket.emit('sendMyPokemon',{
            myPokemon: pokemon,
        })
        socket.on("getPokemonEnemy",({pokemonEnemy}) =>{
            setPokemonEnemy(pokemonEnemy);
        })
    },[start])

    useEffect(() => {
        if(player1_hp == 0){
            setGameOver(true);
            setWinner(2);
        }else if(player2_hp == 0){
            setGameOver(true);
            setWinner(1);
        }
        
        // turn 소켓 받는 함수 넣고
        socket.on('receiveTurn', ({turn}) => {
            setTurn(turn)
        });
    },)

    useEffect(() =>{
        // 버튼 enable
    },[turn])

    useEffect(() =>{
        if(gameOver){
            console.log('over');
            console.log(winner);
            navigation.navigate("Login");
        }
    },[gameOver])

    const pressSkill = () => {
        if(turn == myTurn){
            const damage = 100;
            setPlayer2Hp(player2_hp - damage < 0 ? 0 : player2_hp-damage);
            //setTurn(turn == 1 ? 2 : 1);
            socket.emit("changeTurn",{
                turn : turn,
            });
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.battle} source={require('../public/images/battleback.png')} resizeMode={"stretch"}>
                <View style={{flex: 0.2, alignItems:'center', justifyContent:'flex-end',paddingTop:10}}>
                    <Text style={{fontWeight:'bold', fontSize:15}}>Room Code</Text>
                    <Text style={{}}>temp</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:20}}>
                    <TouchableOpacity style={styles.hpbar}>
                        <Text style={styles.buttonText}>{player2_hp}/{maxHp} </Text>
                    </TouchableOpacity>
                    <Image style={styles.characterImage} source={pokemonEnemy.imgbattlefront}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:50}}>
                    <Image style={styles.characterImage} source={pokemon.imgbattleback}/>
                    <TouchableOpacity style={styles.hpbar}>
                        <Text style={styles.buttonText}> {player1_hp}/{maxHp} </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={styles.interface}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button} onPress={pressSkill}>
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
