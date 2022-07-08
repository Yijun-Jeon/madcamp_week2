import * as React from 'react';
import { useState } from 'react';
import { View, Text,Button,ImageBackground, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen ,RoomScreen} from './screens';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={AuthScreen}
          options={{ title: 'GAGURI' }} // 각 화면 타이틀(헤더에 렌더링됨)
        />
        <Stack.Screen
          name="Details"
          component={RoomScreen}
          options={{ title: 'PROJECT LIST' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

