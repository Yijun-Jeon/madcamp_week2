import { View, Text,TouchableOpacity, StyleSheet,ImageBackground,Image} from 'react-native';
import * as React from 'react';

function SelectScreen({navigation}){

    return(
        <ImageBackground source={require('../public/images/select.jpg')} style={styles.image}>
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
                    <TouchableOpacity>
                        <Image source={require('../public/images/pikachu.gif')} style={styles.buttonAltText}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../public/images/paili.gif')} style={styles.buttonAltText}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../public/images/kkobugi.gif')} style={styles.buttonAltText}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../public/images/isanghaessi.gif')} style={styles.buttonAltText}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../public/images/myu.gif')} style={styles.buttonAltText}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1.3}}>
                    <TouchableOpacity style={{ width: '50%',borderWidth: 2,marginLeft:60, marginTop:30,borderRadius:50, height: 40,backgroundColor:'yellow', borderColor: 'red',justifyContent: 'center',alignItems: 'center',marginVertical: 5}}>
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
        alignItems: 'center',
    },  
    card: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(71, 255, 136, 0.3)',
        marginTop: '30%',
        marginBottom:'10%',
        borderRadius: 20,
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
        justifyContent:'space-between', 
        alignItems:'baseline'
    },
    buttonOk:{
        width: '50%',
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