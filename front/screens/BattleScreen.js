import { View, Text, ImageBackground,StyleSheet,TouchableOpacity,TextInput, Image,Button,ButtonGroup,ActivityIndicator} from 'react-native';
import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import { checkType } from '../utils/character/Skills';

const SOCKET_URL ='http://192.249.18.107:443';

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
    const [skillpoint, setSkillPoint] = useState(1);
    
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
    // const [player1_hp, setPlayer1Hp] = useState([]);
    // const [player2_hp, setPlayer2Hp] = useState([]);
    // const [player1_defense, setPlayer1Defense] = useState([]);
    // const [player2_defense, setPlayer2Defense] = useState([]);
    const [p1_state, setPlayer1State] = useState([]);
    const [p2_state, setPlayer2State] = useState([]);
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
                setPlayer1State(users[0].pokemon.health,0,0);
                setPlayer2Pokemon(users[1].pokemon)
                setPlayer2State(users[1].pokemon.health,0,0);
                socket.emit('initGameState',{
                    gameOver: false,
                    turn: 'Player 1',
                    // player1_hp: users[0].pokemon.health,
                    // player2_hp: users[1].pokemon.health,
                    // player1_defense: 0,
                    // player2_defense: 0,
                    p1_state: [users[0].pokemon.health, 0, 0],
                    p2_state: [users[1].pokemon.health, 0, 0],
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
        socket.on('initGameState', ({ gameOver, turn, p1_state, p2_state, player1_pokemon, player2_pokemon }) => {
            setGameOver(gameOver);
            setTurn(turn);
            // setPlayer1Hp(player1_hp);
            // setPlayer2Hp(player2_hp);
            // setPlayer1Defense(player1_defense);
            // setPlayer2Defense(player2_defense);
            setPlayer1State(p1_state);
            setPlayer2State(p2_state);
            setPlayer1Pokemon(player1_pokemon);
            setPlayer2Pokemon(player2_pokemon);
        });


        socket.on('updateGameState', ({ gameOver, winner, turn, p1_state, p2_state}) => {
            console.log(gameOver)
            gameOver && setGameOver(gameOver);
            winner && setWinner(winner);
            turn && setTurn(turn);
            // player1_hp && setPlayer1Hp(player1_hp);
            // player2_hp && setPlayer2Hp(player2_hp);
            // player1_defense && setPlayer1Defense(player1_defense);
            // player2_defense && setPlayer2Defense(player2_defense);
            p1_state && setPlayer1State(p1_state)
            p2_state && setPlayer2State(p2_state)
        });
    },[]);


    const checkGameOver = (hp) => {
        return hp<=0;
    }
    
    const checkWinner = (hp) => {
        return hp<=0 ? 'Win' : 'Lose';
    }

    const moveToRoom = () =>{
        navigation.navigate("Room",{userName: route.params.userName});
    }

    function getSkillInfo(idx, player_pokemon){
        return [player_pokemon.skills[idx].name,
        player_pokemon.skills[idx].type,
        player_pokemon.skills[idx].damage,
        player_pokemon.skills[idx].target,
        player_pokemon.skills[idx].skilltype];        
    }

    function onSkillPressedHandler(skill_idx){
        if(socket){
            const player = turn
            var delta = SkillHandler(skill_idx, player)
            if(player=='Player 1'){
                socket.emit('updateGameState', {
                    gameOver: checkGameOver(p2_state[0]+delta[3]),
                    winner: checkWinner(p2_state[0]+delta[3], 'Player 1'),
                    turn: 'Player 2',
                    p1_state: [p1_state[0]+delta[0], p1_state[1]+delta[1], p1_state[2]+delta[2]],
                    p2_state: [p2_state[0]+delta[3], p2_state[1]+delta[4], p2_state[2]+delta[5]]
                })
            }
            else{
                socket.emit('updateGameState', {
                    gameOver: checkGameOver(p1_state[0]+delta[0]),
                    winner: checkWinner(p1_state[0]+delta[0], 'Player 2'),
                    turn: 'Player 1',
                    p1_state: [p1_state[0]+delta[0], p1_state[1]+delta[1], p1_state[2]+delta[2]],
                    p2_state: [p2_state[0]+delta[3], p2_state[1]+delta[4], p2_state[2]+delta[5]]
                })
            }   
        }
        switch(skill_idx){
            case 0:
            case 1:
                setSkillPoint(skillpoint+1);
                break;
            case 2:
            case 3:
                setSkillPoint(1);
        }
    }

    const SkillHandler = (skill_idx, player) => {
        const player_pokemon = player=='Player 1'?player1_pokemon:player2_pokemon
        const skill = getSkillInfo(skill_idx, player_pokemon);
        const skillName = skill[0];
        const skillType = skill[1];
        const skillDamage = skill[2];
        const skillTarget = skill[4];

        var state = useSkill(skillType,skillDamage, player,skillTarget);
        return state
    }

    function useSkill(skillType,skillDamage,player,skillTarget){
        var p1_hp=0
        var p1_atk=0
        var p1_df=0
        var p2_hp=0
        var p2_atk=0
        var p2_df=0
        if(player=='Player 1'){
            switch(skillType){
                case '공격': 
                    p2_hp = parseInt(skillDamage*checkType(skillTarget,player2_pokemon.type)*(1-p2_state[2]/100+p1_state[1]/100)>=p2_state[0] ? -p2_state[0] : -skillDamage*checkType(skillTarget,player2_pokemon.type)*(1-p2_state[2]/100+p1_state[1]/100))
                    break;
                case '힐':
                    p1_hp = skillDamage+p1_state[0]>=player1_pokemon.health ? player1_pokemon.health-p1_state[0] : skillDamage
                    break;
                case '공디버프':
                    p2_atk = -skillDamage
                    break;
                case '공버프':
                    p1_atk = skillDamage
                    break;
                case '방디버프':
                    p2_df = -skillDamage
                    break;
                case '방버프':
                    p1_df = skillDamage
                    break;
            }
        }
        else{
            switch(skillType){
                case '공격': 
                    p1_hp = parseInt(skillDamage*checkType(skillTarget,player1_pokemon.type)*(1-p1_state[2]/100+p2_state[1]/100)>=p1_state[0] ? -p1_state[0] : -skillDamage*checkType(skillTarget,player1_pokemon.type)*(1-p1_state[2]/100+p2_state[1]/100))
                    break;
                case '힐':
                    p2_hp = skillDamage+p2_state[0]>=player2_pokemon.health ? player2_pokemon.health-p2_state[0] : skillDamage
                    break;
                case '공디버프':
                    p1_atk = -skillDamage
                    break;
                case '공버프':
                    p2_atk = skillDamage
                    break;
                case '방디버프':
                    p1_df = -skillDamage
                    break;
                case '방버프':
                    p2_df = skillDamage
                    break;
            }
        }
        console.log(p1_hp,p2_hp,p1_df,p2_df)

        return [p1_hp, p1_atk, p1_df, p2_hp, p2_atk, p2_df]   
    }

    function getMyPokemon(){
        return currentUser=='Player 1'?player1_pokemon:player2_pokemon;
    }

    function getEnemyPokemon(){
        return currentUser=='Player 1'?player2_pokemon:player1_pokemon;
    }

    function getMyState(){
        return currentUser=='Player 1'?p1_state:p2_state;
    }

    function getEnemyState(){
        return currentUser=='Player 1'?p2_state:p1_state;
    }


    
    if(!gameOver){
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.battle} source={require('../public/images/battleback.png')} resizeMode={"stretch"}>
                    <View style={{flex: 0.2, alignItems:'center', justifyContent:'flex-end',paddingTop:10}}>    
                        <Text style={{fontWeight:'bold', fontSize:15}}>Room Code</Text>
                        <Text style={{}}>{roomCode}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:20}}>
                        {users.length==2 && 
                        <TouchableOpacity style={styles.hpbar} disabled={true}>
                            <Text style={styles.hpText}> {getEnemyState()[0]}/{getEnemyPokemon().health} </Text>
                            <Image source={require('../public/images/attack.png')} style={styles.buttonImage}></Image>
                            <Text style={styles.defenseText}> {getEnemyState()[1]}/{getEnemyState()[2]} </Text>
                            <Text style>%</Text>
                            <Image source={require('../public/images/defense.png')} style={styles.buttonImage}></Image>
                        </TouchableOpacity> }
                        {users.length==2 && 
                        <Image
                            style={styles.characterImage}
                            source={getEnemyPokemon().imgbattlefront}/>}
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:50}}>
                        <Image style={styles.characterImage} source={pokemon.imgbattleback}/>
                        <TouchableOpacity style={styles.hpbar} disabled={true}>
                            {users.length==2 ?
                            <Text style={styles.hpText}> {getMyState()[0]}/{pokemon.health} </Text> :
                            <Text style={styles.hpText}> {pokemon.health}/{pokemon.health} </Text>
                            }
                            <Image source={require('../public/images/attack.png')} style={styles.buttonImage}></Image>
                            {users.length==2 ?
                            <Text style={styles.defenseText}> {getMyState()[1]}/{getMyState()[2]} </Text> :
                            <Text style={styles.defenseText}> 0/0 </Text>
                            }
                            <Text style>%</Text>
                            <Image source={require('../public/images/defense.png')} style={styles.buttonImage}></Image>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 15, color:'purple'}}>Skill Point: {skillpoint}</Text>
                </ImageBackground>

                <View style={{backgroundColor: "white", flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text> text </Text>
                </View> 
                
                {(users.length < 2 || turn!==currentUser) ? 
                <View style={[styles.interface, {alignItems: 'center', justifyContent: 'center'}]}>
                    <ActivityIndicator size="large" color="#000000" />
                </View> : 
                <View style={styles.interface}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={styles.button} disabled={turn!==currentUser || users.length < 2} onPress={()=>onSkillPressedHandler(0)}>
                            <Text style={styles.buttonText}>{skill1}</Text>
                            <Text style={styles.spText}>SP:1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} disabled={turn!==currentUser || users.length < 2} onPress={()=>onSkillPressedHandler(1)}>
                            <Text style={styles.buttonText}>{skill2}</Text>
                            <Text style={styles.spText}>SP:1</Text>
                        </TouchableOpacity> 
                    </View>
        
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={styles.button} disabled={turn!==currentUser || users.length < 2 || skillpoint < 3} onPress={()=>onSkillPressedHandler(2)}>
                            <Text style={styles.buttonText}>{skill3}</Text>
                            <Text style={styles.spText}>SP:3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} disabled={turn!==currentUser || users.length < 2 || skillpoint < 5} onPress={()=>onSkillPressedHandler(3)}>
                            <Text style={styles.buttonText}>{skill4}</Text>
                            <Text style={styles.spText}>SP:5</Text>
                        </TouchableOpacity> 
                    </View>
                </View>}
            </View>
        );
    }else{
        return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <View style={{marginBottom:0, flexDirection:'row'}}>
                <Text style={{fontSize:80,}}>You</Text>
                {checkWinner(getEnemyState()[0]) == 'Win' &&<Text style={{fontSize:80, marginLeft:30,color:'blue'}}>{checkWinner(getEnemyState()[0])}</Text>}
                {checkWinner(getEnemyState()[0]) == 'Lose' &&<Text style={{fontSize:80, marginLeft:30,color:'red'}}>{checkWinner(getEnemyState()[0])}</Text>}
            </View>
            <Text style={{fontSize: 50, marginBottom:30}}>{userName}</Text>
            <Image style={{}} source={pokemon.imgfront}></Image>

            <TouchableOpacity style={{ width: '50%',marginTop:100, borderWidth: 2,borderRadius:50, height: 40,backgroundColor:'yellow', borderColor: 'red',justifyContent: 'center',alignItems: 'center'}}  onPress={moveToRoom}>
                <Text style={{width: 50,height: 20,justifyContent: 'center',alignItems: 'center'}}>Restart</Text>
            </TouchableOpacity>
         </View>);
    }
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
        flexDirection:'row',
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
        fontWeight: '400',
        marginRight:5,
    },
    spText:{
        color: 'white',
        fontSize:12,
        marginLeft:15,
    },
    defenseText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    characterImage: {
        margin: 30
    },
    buttonImage:{
        maxHeight:30,
        maxWidth:30,
    },
  }); 

  

  export default BattleScreen;
