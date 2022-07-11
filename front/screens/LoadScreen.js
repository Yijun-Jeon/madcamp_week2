import {View,Text,Image} from 'react-native';
import React, { useState,useEffect } from 'react';

function LoadScreen(){
    return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../public/images/pikachu_load.gif')}></Image>
        </View>
    );
}

export default LoadScreen;