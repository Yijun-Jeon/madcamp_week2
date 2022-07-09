import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen ,RoomScreen, SelectScreen} from './screens';
import { render } from 'react-dom';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Select" screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={AuthScreen}
        />
        <Stack.Screen
          name="Room"
          component={RoomScreen}
        />
        <Stack.Screen
          name="Select"
          component={SelectScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

