import React, { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen ,RoomScreen, SelectScreen, BattleScreen, LoadScreen, EndScreen, KakaoScreen} from './screens';
import { Asset } from 'expo-asset/build/Asset';

const Stack = createStackNavigator();

function useImages(images){
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() =>{
      Asset.loadAsync(images)
      .then(() => setLoaded(true))
      .catch(setError);
  }, []);
  return [loaded,error];
}

function App() {
  const [imagesLoaded] = useImages([
    require('./public/images/kakao.png'),
    require('./public/images/roomback.png'),
    require('./public/images/pikachu.gif'),
    require('./public/images/paili.gif'),
    require('./public/images/battleback.png'),
    require('./public/images/gradient-back.jpeg'),
    require('./public/images/isanghaessi.gif'),
    require('./public/images/isanghaessi_back.gif'),
    require('./public/images/isanghaessi_battle_back.gif'),
    require('./public/images/isanghaessi_battle.gif'),
    require('./public/images/kkobugi.gif'),
    require('./public/images/kkobugi_back.gif'),
    require('./public/images/kkobugi_battle.gif'),
    require('./public/images/kkobugi_battle_back.gif'),
    require('./public/images/myu.gif'),
    require('./public/images/myu_back.gif'),
    require('./public/images/myu_battle.gif'),
    require('./public/images/myu_battle_back.gif'),
    require('./public/images/paili_back.gif'),
    require('./public/images/paili_battle.gif'),
    require('./public/images/paili_battle_back.gif'),
    require('./public/images/pikachu_back.gif'),
    require('./public/images/pikachu_battle.gif'),
    require('./public/images/pikachu_battle_back.gif'),
    require('./public/images/select.jpg'),
    require('./public/images/blank.png'),
    require('./public/images/attack.png'),
    require('./public/images/defense.png'),
    require('./public/images/defense.png'),
    require('./public/images/roomcode.png'),
    require('./public/images/exit.png'),
    require('./public/images/pikachu_load.gif'),
    require('./public/images/digda.gif'),
  ]);

  if(!imagesLoaded){
    return <LoadScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={AuthScreen}
        />
        <Stack.Screen
          name="Room"
          component={RoomScreen}
        />
        <Stack.Screen
          name="Battle"
          component={BattleScreen}
        />
        <Stack.Screen
          name="Select"
          component={SelectScreen}
        />
        <Stack.Screen
          name="End"
          component={EndScreen}
        />
        <Stack.Screen
          name="Kakao"
          component={KakaoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
