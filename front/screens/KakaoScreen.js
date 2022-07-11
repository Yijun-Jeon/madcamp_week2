import React from 'react';
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import qs from 'querystring';

 

// other import settings...

const REST_API_KEY = 'c7e83064c28a89c1c1396870155b303d'
const REDIRECT_URI = 'http://192.249.18.107:443/oauth'
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;



const KakaoLogin = ({ navigation }) => {
    const getCode = (target) => {
        const exp = 'code=';
        const condition = target.indexOf(exp);
        if (condition !== -1) {
            const requestCode = target.substring(condition + exp.length);
            requestToken(requestCode);
        }
    };
    const requestToken = async (code) => {
        const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';
        
        const options = qs.stringify({
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            client_secret: '6Nw4x3HXrCLli4EaExKYgbY3967R5EsO',
            code,
        });
        
        try {
            const tokenResponse = await axios.post(requestTokenUrl, options);
            const ACCESS_TOKEN = tokenResponse.data.access_token;
            const body = {
                ACCESS_TOKEN,
            };
            const response = await axios.post(REDIRECT_URI, body);
            const value = response.data;
            console.log(value.result)
            navigation.navigate('Room', {userName: value.name});
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <WebView
            style={{ flex: 1 }}
            source={{
                uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
            }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            javaScriptEnabled
            onMessage={event => {
                console.log("event start")
                const data = event.nativeEvent.url;
                getCode(data);
            }}
            />
        </View>
    );
};

 

export default KakaoLogin;