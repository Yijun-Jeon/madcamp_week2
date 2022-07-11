import {View,Text,Image,TouchableOpacity} from 'react-native';

function EndScreen({route,navigation}){

    const moveToRoom = () =>{
        navigation.navigate("Room",{userName: route.params.userName});
    }

    const isWin = (route.params.isWin == 'Win');

    return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <View style={{marginBottom:0, flexDirection:'row'}}>
                <Text style={{fontSize:80,}}>You</Text>
                {isWin && <Text style={{fontSize:80, marginLeft:30,color:'blue'}}>{route.params.isWin}</Text>}
                {!isWin && <Text style={{fontSize:80, marginLeft:30,color:'red'}}>{route.params.isWin}</Text>}
            </View>
            <Text style={{fontSize: 50, marginBottom:30}}>{route.params.userName}</Text>
            <Image style={{}} source={route.params.img}></Image>

            <TouchableOpacity style={{ width: '50%',marginTop:100, borderWidth: 2,borderRadius:50, height: 40,backgroundColor:'yellow', borderColor: 'red',justifyContent: 'center',alignItems: 'center'}}  onPress={moveToRoom}>
                <Text style={{width: 50,height: 20,justifyContent: 'center',alignItems: 'center'}}>Restart</Text>
            </TouchableOpacity>
        </View>
    );
}

export default EndScreen;