import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput,Image} from 'react-native';

// const API_URL = Platform.OS === 'ios' ? 'http://localhost:443' : 'http://10.0.2.2:443';
const API_URL = 'http://192.249.18.107:443';

function AuthScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    
    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onSubmitHandler = () => {
        const payload = {
            email,
            name,
            password,
        };
        console.log(payload.name);
        fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    onLoggedIn(jsonRes.token);
                    setIsError(false);
                    setMessage(jsonRes.message);
                    moveToRoom(jsonRes.name);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    const moveToRoom= (name) =>{
        if(!isError){
            navigation.navigate('Room',{userName: name});
        }
    }

    return (
        <ImageBackground source={require('../public/images/gradient-back.jpeg')} style={styles.image}>
            <View style={styles.card}>
                <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={n => setName(n.target.value)}></TextInput>}
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
                        {isLogin && <TouchableOpacity style={styles.buttonAltKakao}>
                            <Image source={require('../public/images/kakao.png')} style={styles.buttonImage}></Image>
                            <Text style={styles.buttonAltTextKG}>Kakao 로그인</Text>
                        </TouchableOpacity>}
                        {isLogin && <TouchableOpacity style={styles.buttonAltGoogle}>
                        <Image source={require('../public/images/google.png')} style={styles.buttonImage}></Image>
                            <Text style={styles.buttonAltTextKG}>Google 로그인</Text>
                        </TouchableOpacity>}
                    </View>   
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },  
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
        maxHeight: 450,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
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
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltKakao: {
        width: '80%',
        height: 40,
        borderRadius: 50,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    buttonAltGoogle: {
        width: '80%',
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonAltTextKG: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '13%',
    },
    buttonImage:{
        maxHeight:20,
        maxWidth:20,
        marginLeft:'10%'
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
  });

export default AuthScreen;