import { View, Text, ImageBackground,StyleSheet,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function RoomScreen({ route, navigation }) {
    const {userName} = route.params;
    return (
        <ImageBackground source={require('../public/images/roomback.png')} style={styles.image}>
            <View style={styles.card}>
                <Text style={styles.heading}>Name: {JSON.stringify(userName)}</Text>
            </View>
            <TouchableOpacity style={styles.buttonAlt}>
                <Text style={styles.buttonAltText}>방 만들기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAlt}>
                <Text style={styles.buttonAltText}>방 입장하기</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
    },  
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '40%',
        marginTop: '15%',
        borderRadius: 20,
        maxHeight: 200,
        paddingBottom: '30%',
        marginLeft: 30,
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
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
  }); 

  

  export default RoomScreen;