import { View, Text,TouchableOpacity, StyleSheet,ImageBackground,Image} from 'react-native';
import React, { useState } from 'react';
import {Pokemon,pokemons} from '../utils/character/Pokemon';

const SOCKET_URL ='http://192.249.18.107:443';

function SelectScreen({route, navigation}){

    const [pokemon,setPokemon] = useState(pokemons[0]);
    
    const [name,setName] = useState('피카츄');
    const [type,setType] = useState('전기');
    const [killo, setKillo] = useState('6.0kg');
    const [species,setSpecies] = useState('쥐 포켓몬');
    const [textColor, setTextColor] = useState('yellow');
    
    const selectPikachu = () =>{
        setPokemon(pokemons[0]);
        setName('피카츄');
        setType('전기');
        setKillo('6.0kg');
        setSpecies('쥐 포켓몬');
        setTextColor('yellow');
    }

    const selectPaili = () =>{
        setPokemon(pokemons[1]);
        setName('파이리');
        setType('불꽃');
        setKillo('8.5kg');
        setSpecies('도롱뇽 포켓몬');
        setTextColor('orange');
    }

    const selectKkobugi = () =>{
        setPokemon(pokemons[2]);
        setName('꼬부기');
        setType('물');
        setKillo('9.0kg');
        setSpecies('꼬마거북 포켓몬');
        setTextColor('rgba(154, 236, 219,1.0)');
    }

    const selectIsanghaessi = () =>{
        setPokemon(pokemons[3]);
        setName('이상해씨');
        setType('풀 / 독');
        setKillo('6.9kg');
        setSpecies('씨앗 포켓몬');
        setTextColor('green');
    }

    const selectMyu = () =>{
        setPokemon(pokemons[4]);
        setName('뮤');
        setType('에스퍼');
        setKillo('4.0kg');
        setSpecies('신종 포켓몬');
        setTextColor('pink');
    }
    
    const moveToBattle = () =>{
        navigation.navigate('Battle',{roomCode: route.params.roomCode ,  pokemon: pokemon, userName: route.params.userName, color: textColor})
    }


    return(
        <ImageBackground source={require('../public/images/select.jpg')} style={styles.image}>
            <View style={{flex: 1,marginLeft:'5%', alignItems:'flex-start', justifyContent:'flex-end',marginTop:50}}>
                <Image source={require('../public/images/roomcode.png')}></Image>
                <Text style={{fontSize:15, color:'white',fontWeight:'bold',marginLeft:'7%'}}>{route.params.roomCode}</Text>
            </View>
            <View style={{flex: 7}}>
                <View style={styles.card}>
                    <View style={{flex: 1, alignItems:'flex-end',justifyContent:'space-evenly'}}>
                            <Text style={[styles.heading,{color:textColor}]}>이름 :</Text>
                            <Text style={[styles.heading,{color:textColor}]}>타입 :</Text>
                            <Text style={[styles.heading,{color:textColor}]}>몸무게 :</Text>
                            <Text style={[styles.heading,{color:textColor}]}>분류 :</Text>
                    </View>
                    <View style={{flex: 2,alignItems:'center',justifyContent:'space-evenly'}}>
                        <Text style={styles.explain}>{name}</Text>
                        <Text style={styles.explain}>{type}</Text>
                        <Text style={styles.explain}>{killo}</Text>
                        <Text style={styles.explain}>{species}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 6,marginBottom:50}}>
                <View style={styles.images}>
                    <TouchableOpacity onPress={selectPikachu}>
                        <Image source={require('../public/images/pikachu.gif')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={selectPaili}>
                        <Image source={require('../public/images/paili.gif')} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={selectKkobugi}>
                        <Image source={require('../public/images/kkobugi.gif')} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={selectIsanghaessi}>
                        <Image source={require('../public/images/isanghaessi.gif')} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={selectMyu}>
                        <Image source={require('../public/images/myu.gif')} ></Image>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1.3,alignItems:'center'}}>
                    <TouchableOpacity style={{ width: '30%',marginTop:10, borderWidth: 2,borderRadius:50, height: 40,backgroundColor:textColor, borderColor: 'white',justifyContent: 'center',alignItems: 'center',mcalarginVerti: 5}} onPress={moveToBattle}>
                        <Text style={styles.buttonAltText}>Select</Text>
                    </TouchableOpacity>
                </View>
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
        flexDirection: 'row',
        backgroundColor: 'rgba(250, 170, 90, 0.2)',
        marginTop: '10%',
        marginBottom:'20%',
        borderRadius: 20,
        marginLeft:'12%',
        width: 300,
        justifyContent:'center',
        alignContent: 'center',
    },
    heading:{
        fontWeight: 'bold',
        fontSize: 30,
    },
    explain:{
        fontSize: 25,
        marginTop: 7,
        fontWeight: '900',
        color:'black',
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
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },
    images:{
        flex: 1, 
        flexDirection:'row',
        justifyContent:'space-evenly', 
        alignItems:'baseline'
    },
    buttonOk:{
        borderWidth: 2,
        marginLeft:60,
        marginTop:30,
        borderRadius:50,
        height: 40,
        backgroundColor:'yellow',
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
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
        width: '10%',
        borderWidth: 1,
        height: 40,
        borderColor: 'red',
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

export default SelectScreen;