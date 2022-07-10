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

    const [myTurn, setMyTurn] = useState(1)
    const [start, setStart] = useState(false);

    const skill1 = pokemon.skills[0].name;
    const skill2 = pokemon.skills[1].name;
    const skill3 = pokemon.skills[2].name;
    const skill4 = pokemon.skills[3].name;

    // 화면 첫 실행, 새로고침
    useEffect(() =>{
        socket = io.connect(SOCKET_URL, connectionOptions)

        setPlayer1Hp(500);
        setPlayer2Hp(500);

        // socket.emit('join',{
        //     room: roomCode,
        // });

        // socket.on('getMyTurn',({myTurn}) =>{
        //     setMyTurn(myTurn);
        //     if(myTurn == 2){
        //         setStart(true);
        //     }
        // })

    },[])

    useEffect(()=>{
        // socket.emit('sendMyPokemon',{
        //     myPokemon: pokemon,
        // })
        // socket.on("getPokemonEnemy",({pokemonEnemy}) =>{
        //     setPokemonEnemy(pokemonEnemy);
        // })
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
        // socket.on('receiveTurn', ({turn}) => {
        //     setTurn(turn)
        // });
    },)

    useEffect(() =>{
        // 버튼 enable
    },[turn])

    useEffect(() =>{
        if(gameOver){
            console.log('over');
            console.log(winner);
            navigation.navigate("End");
        }
    },[gameOver])

    function pressSkill(idx){
        return [pokemon.skills[idx].name,
                 pokemon.skills[idx].type,
                 pokemon.skills[idx].damage,
                 pokemon.skills[idx].target];        
    }
    function checkDead(hp,damage){
        if(hp - damage <= 0)
            return 0;
        else
            return hp - damage;
    }
    function ckeckBuff(hp,buff){
        if(hp + buff >= maxHp)
            return maxHp;
        else
            return hp + buff;
    }
    const pressSkill1 = () => {
        if(turn == myTurn){
            const skill = pressSkill(0);
            const skillName = skill[0];
            const skillType = skill[1];
            const skillDamage = skill[2];
            const skillTarget = skill[3];

            switch(skillType){
                case '공격':
                    setPlayer2Hp(checkDead(player2_hp,skillDamage));
                    break;
                case '버프':
                    // if(skillTarget == 'self'){
                    //     set
                    // }
            }
        }
    }
    const pressSkill2 = () => {
        if(turn == myTurn){
            const skill = pressSkill(1);
            const skillName = skill[0];
            const skillType = skill[1];
            const skillDamage = skill[2];
            const skillTarget = skill[3];
        }
    }
    const pressSkill3 = () => {
        if(turn == myTurn){
            const skill = pressSkill(2);
            const skillName = skill[0];
            const skillType = skill[1];
            const skillDamage = skill[2];
            const skillTarget = skill[3];
        }
    }
    const pressSkill4 = () => {
        if(turn == myTurn){
            const skill = pressSkill(3);
            const skillName = skill[0];
            const skillType = skill[1];
            const skillDamage = skill[2];
            const skillTarget = skill[3];
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
                    <TouchableOpacity style={styles.button} onPress={pressSkill1}>
                        <Text style={styles.buttonText}>{skill1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}  onPress={pressSkill2}>
                        <Text style={styles.buttonText}>{skill2}</Text>
                    </TouchableOpacity> 
                </View>
                
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button}  onPress={pressSkill3}>
                        <Text style={styles.buttonText}>{skill3}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={pressSkill4}>
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
