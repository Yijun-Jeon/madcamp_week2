import { View, Text,TouchableOpacity, StyleSheet,ImageBackground,Image} from 'react-native';
import React, { useState } from 'react';
import {Pokemon,pokemons} from '../utils/character/Pokemon';

const SOCKET_URL ='http://192.249.18.107:443';

function SelectScreen({route, navigation}){

    const [pokemon,setPokemon] = useState(pokemons[0]);
    
    const selectPikachu = () =>{
        setPokemon(pokemons[0]);
    }

    const selectPaili = () =>{
        setPokemon(pokemons[1]);
    }

    const selectKkobugi = () =>{
        setPokemon(pokemons[2]);
    }

    const selectIsanghaessi = () =>{
        setPokemon(pokemons[3]);
    }

    const selectMyu = () =>{
        setPokemon(pokemons[4]);
    }
    
    const moveToBattle = () =>{
        navigation.navigate('Battle',{username: route.params.userName, roomCode: route.params.roomCode ,  pokemon: pokemon})
    }


    return(
        <ImageBackground source={require('../public/images/select.jpg')} style={styles.image}>
            <View style={{flex: 0.2,marginLeft:'10%', alignItems:'flex-start', justifyContent:'flex-end',marginTop:50}}>
                <Text style={{fontWeight:'bold', fontSize:15}}>Room Code</Text>
                <Text style={{}}>{route.params.roomCode}</Text>
            </View>
            <View style={{flex: 5}}>
                <View style={styles.card}>
                    <View style={{flex: 1, alignItems:'flex-end',justifyContent:'space-evenly'}}>
                            <Text style={styles.heading}>이상해씨 :</Text>
                            <Text style={styles.heading}>타입 :</Text>
                            <Text style={styles.heading}>몸무게 :</Text>
                            <Text style={styles.heading}>분류 :</Text>
                    </View>
                    <View style={{flex: 1,alignItems:'center',justifyContent:'space-evenly'}}>
                        <Text style={styles.explain}>No. 001</Text>
                        <Text style={styles.explain}>풀 / 독</Text>
                        <Text style={styles.explain}>6.9kg</Text>
                        <Text style={styles.explain}>씨앗포켓몬</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 4}}>
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
                    <TouchableOpacity style={{ width: '30%',marginTop:10, borderWidth: 2,borderRadius:50, height: 40,backgroundColor:'yellow', borderColor: 'red',justifyContent: 'center',alignItems: 'center',mcalarginVerti: 5}} onPress={moveToBattle}>
                        <Text style={styles.buttonAltText}>OK</Text>
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
        backgroundColor: 'rgba(71, 255, 136, 0.3)',
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
        fontSize: 20,
        marginTop: 2,
        
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
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
  });

export default SelectScreen;