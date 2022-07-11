import { View, Text, ImageBackground,StyleSheet,TouchableOpacity,TextInput, Image,Button,ButtonGroup,ActivityIndicator} from 'react-native';
import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import {Pokemon, pokemons} from '..//utils/character/Pokemon';

const SOCKET_URL ='http://192.249.18.107:443';
const blank_path = '../public/images/blank.png';


let socket;
function BattleScreen({ route, navigation }) {
    const roomCode = route.params.roomCode;
    const pokemon = route.params.pokemon;
    const [userName,setUserName] = useState(route.params.userName);

    //initialize socket state
    const [room, setRoom] = useState(roomCode);
    const [roomFull, setRoomFull] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    
    useEffect(() => {
        const connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io.connect(SOCKET_URL, connectionOptions);

        socket.emit('join', {room: room, pokemon: pokemon}, (error) => {
            if(error)
                setRoomFull(true);
        });

        //cleanup on component unmount
        return function cleanup() {
            socket.emit('room_disconnect');
            //shut down connnection instance
            socket.off();
        };
    }, []);

    //initialize game state
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');
    const [turn, setTurn] = useState('Player 1');
    const [player1_hp, setPlayer1Hp] = useState([]);
    const [player2_hp, setPlayer2Hp] = useState([]);
    const [player1_defense, setPlayer1Defense] = useState([]);
    const [player2_defense, setPlayer2Defense] = useState([]);
    // const [player1_status, setPlayer1Status] = useState([]);
    // const [player2_status, setPlayer2Status] = useState([]);
    const [player1_pokemon, setPlayer1Pokemon] = useState([pokemon]);
    const [player2_pokemon, setPlayer2Pokemon] = useState([]);



    const skill1 = pokemon.skills[0].name;
    const skill2 = pokemon.skills[1].name;
    const skill3 = pokemon.skills[2].name;
    const skill4 = pokemon.skills[3].name;


    useEffect(() => {
        socket.on("roomData", ({ users }) => {
            setUsers(users);
            if(users.length==2){
                setPlayer1Pokemon(users[0].pokemon)
                setPlayer1Hp(users[0].pokemon.health);
                setPlayer2Pokemon(users[1].pokemon)
                setPlayer2Hp(users[1].pokemon.health);
                socket.emit('initGameState',{
                    gameOver: false,
                    turn: 'Player 1',
                    player1_hp: users[0].pokemon.health,
                    player2_hp: users[1].pokemon.health,
                    player1_defense: 0,
                    player2_defense: 0,
                    player1_pokemon: users[0].pokemon,
                    player2_pokemon: users[1].pokemon,
                });
            }
        })
        socket.on('currentUserData', ({ name }) => {
            setCurrentUser(name);
        })
    }, []);
    

    useEffect(() => {
        socket.on('initGameState', ({ gameOver, turn, player1_hp, player2_hp, player1_defense, player2_defense,player1_pokemon, player2_pokemon }) => {
            setGameOver(gameOver);
            setTurn(turn);
            setPlayer1Hp(player1_hp);
            setPlayer2Hp(player2_hp);
            setPlayer1Defense(player1_defense);
            setPlayer2Defense(player2_defense);
            setPlayer1Pokemon(player1_pokemon);
            setPlayer2Pokemon(player2_pokemon);
        });


        socket.on('updateGameState', ({ gameOver, winner, turn, player1_hp, player2_hp, player1_defense, player2_defense}) => {
            gameOver && setGameOver(gameOver);
            winner && setWinner(winner);
            turn && setTurn(turn);
            player1_hp && setPlayer1Hp(player1_hp);
            player2_hp && setPlayer2Hp(player2_hp);
            player1_defense && setPlayer1Defense(player1_defense);
            player2_defense && setPlayer2Defense(player2_defense);
        });
    },[]);


    const checkGameOver = (hp) => {
        return hp<=0;
    }
    
    const checkWinner = (hp, player) => {
        return hp<=0 ? player : '';
    }

    function getSkillInfo(idx, player_pokemon){
        return [player_pokemon.skills[idx].name,
        player_pokemon.skills[idx].type,
        player_pokemon.skills[idx].damage,
        player_pokemon.skills[idx].target];        
    }

    function onSkillPressedHandler(skill_idx){
        if(socket){
            const player = turn
            var delta = SkillHandler(skill_idx, player)
            if(player=='Player 1'){
                socket.emit('updateGameState', {
                    gameOver: checkGameOver(player2_hp),
                    winner: checkWinner(player2_hp, 'Player 1'),
                    turn: 'Player 2',
                    player1_hp: player1_hp+delta[0],
                    player2_hp: player2_hp+delta[1],
                    player1_defense: player1_defense+delta[2],
                    player2_defense: player2_defense+delta[3]
                })
            }
            else{
                socket.emit('updateGameState', {
                    gameOver: checkGameOver(player1_hp),
                    winner: checkWinner(player1_hp, 'Player 2'),
                    turn: 'Player 1',
                    player1_hp: player1_hp+delta[0],
                    player2_hp: player2_hp+delta[1],
                    player1_defense: player1_defense+delta[2],
                    player2_defense: player2_defense+delta[3]
                })
            }   
        }
    }

    const SkillHandler = (skill_idx, player) => {
        const player_pokemon = player=='Player 1'?player1_pokemon:player2_pokemon
        const skill = getSkillInfo(skill_idx, player_pokemon);
        const skillName = skill[0];
        const skillType = skill[1];
        const skillDamage = skill[2];
        const skillTarget = skill[3];

        var state = useSkill(skillType,skillDamage, player);
        return state
    }
    

    useEffect(() =>{
        if(gameOver){
            navigation.navigate("End",{img: pokemon.imgfront, userName: userName, isWin: 'Win'});
        }
    },[gameOver])


    function useSkill(skillType,skillDamage,player){
        var p1_hp=0
        var p2_hp=0
        var p1_df=0
        var p2_df=0
        if(player=='Player 1'){
            switch(skillType){
                case '공격': 
                    p2_hp = skillDamage*(1-player2_defense/100)>=player2_hp ? -player2_hp : -skillDamage*(1-player2_defense/100)
                    break;
                case '힐':
                    p1_hp = skillDamage*(1-player1_defense/100)+player1_hp>=maxHp ? maxHp-player1_hp : skillDamage*(1-player1_defense/100)
                    break;
                case '디버프':
                    p2_df = -skillDamage
                    break;
                case '버프':
                    p1_df = skillDamage
                    break;
            }
        }
        else{
            switch(skillType){
                case '공격': 
                    p1_hp = skillDamage*(1-player1_defense/100)>=player1_hp ? -player1_hp : -skillDamage*(1-player1_defense/100)
                    break;
                case '힐':
                    p2_hp = skillDamage*(1-player2_defense/100)+player2_hp>=maxHp ? maxHp-player2_hp : skillDamage*(1-player2_defense/100)
                    break;
                case '디버프':
                    p1_df = -skillDamage
                    break;
                case '버프':
                    p2_df = skillDamage
                    break;
            }
        }
        console.log(p1_hp,p2_hp,p1_df,p2_df)

        return [p1_hp,p2_hp,p1_df,p2_df]   
    }

    function getMyPokemon(){
        return currentUser=='Player 1'?player1_pokemon:player2_pokemon;
    }

    function getEnemyPokemon(){
        return currentUser=='Player 1'?player2_pokemon:player1_pokemon;
    }


    

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.battle} source={require('../public/images/battleback.png')} resizeMode={"stretch"}>
                <View style={{flex: 0.2, alignItems:'center', justifyContent:'flex-end',paddingTop:10}}>    
                    <Text style={{fontWeight:'bold', fontSize:15}}>Room Code</Text>
                    <Text style={{}}>{roomCode}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:20}}>
                    {users.length==2
                    && <TouchableOpacity style={styles.hpbar} disabled={true}>
                        <Text style={styles.hpText}> {currentUser=='Player 1'?player2_hp:player1_hp}/{currentUser=='Player 1'?player2_pokemon.health:player1_pokemon.health} </Text>
                        <Text style={styles.defenseText}> {currentUser=='Player 1'?player2_defense:player1_defense}</Text>
                        <Text style>%</Text>
                        </TouchableOpacity> }
                    {users.length==2
                    && <Image
                            style={styles.characterImage}
                            source={currentUser=='Player 1'?player2_pokemon.imgbattlefront:player1_pokemon.imgbattlefront}/>}
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:50}}>
                    <Image style={styles.characterImage} source={pokemon.imgbattleback}/>
                    <TouchableOpacity style={styles.hpbar} disabled={true}>
                        <Text style={styles.hpText}> {currentUser=='Player 1'?player1_hp:player2_hp}/{pokemon.health} </Text>
                        <Text style={styles.defenseText}> {currentUser=='Player 1'?player1_defense:player2_defense}</Text>
                        <Text style>%</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={styles.interface}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button} disabled={turn!==currentUser} onPress={()=>onSkillPressedHandler(0)}>
                        <Text style={styles.buttonText}>{skill1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} disabled={turn!==currentUser} onPress={()=>onSkillPressedHandler(1)}>
                        <Text style={styles.buttonText}>{skill2}</Text>
                    </TouchableOpacity> 
                </View>
                
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button} disabled={turn!==currentUser} onPress={()=>onSkillPressedHandler(2)}>
                        <Text style={styles.buttonText}>{skill3}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} disabled={turn!==currentUser} onPress={()=>onSkillPressedHandler(3)}>
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
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        height: 55,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    hpText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400'
    },
    defenseText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 30,
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
