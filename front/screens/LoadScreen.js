import {View,Text,Image} from 'react-native';
import React, { useState,useEffect } from 'react';

function LoadScreen(){
    return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center',color:'rgb(247,247,249)'}}>
            <Image source={require('../public/images/loading.gif')}></Image>
        </View>
    );
}

export default LoadScreen;