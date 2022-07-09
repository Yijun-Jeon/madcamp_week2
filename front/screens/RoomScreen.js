import { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import io from 'socket.io-client';

const SOCKET_URL ='http://192.249.18.107:443';

function RoomScreen({ navigation }) {
  useEffect(()=>{
    const socket = io.connect(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
    });
  
    socket.emit("chatting", "from front");

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  })


  
}


  
export default RoomScreen;