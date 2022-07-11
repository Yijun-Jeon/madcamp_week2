import {Webview} from 'react-native-webview';
import {View,Text,Image} from 'react-native';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const REST_API_KEY = 'c7e83064c28a89c1c1396870155b303d'
const REDIRECT_URI  = 'http://192.249.18.107:443/oauth'

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function KakaoScrren({navigation}) {
    function LogInProgress(data) {
        // access code는 url에 붙어 장황하게 날아온다.
        // substringd으로 url에서 code=뒤를 substring하면 된다.
        const exp = "code=";
        var condition = data.indexOf(exp);
        if (condition != -1) {
            var request_code = data.substring(condition + exp.length);
            // console.log("access code :: " + request_code);
            // 토큰값 받기
            requestToken(request_code);
        }
    };

    const requestToken = async (request_code) => {
        var returnValue = "none";
        var request_token_url = "https://kauth.kakao.com/oauth/token";
        axios({
            method: "post",
            url: request_token_url,
            params: {
                grant_type: 'authorization_code',
                client_id: 'ic',
                redirect_uri: 'url',
                code: request_code,
            },
        }).then(function (response) {
            returnValue = response.data.access_token;
        }).catch(function (error) {
            console.log('error', error);
        });
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
                navigation.navigate()
            }}
        />
        </View>
  );
}

export default KakaoScrren;