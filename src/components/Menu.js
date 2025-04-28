import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Menu = (props) =>{
    const sair = () =>{
        props.navigation.pop();
    }

    return(
        <View style={st.containerMenu}>
            <TouchableOpacity style={st.botao}>
                <Icon name="home" size={60} color="black"/>
                <Text style={st.textoMenu}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity style={st.botao}>
                <Icon name="sprout" size={60} color="black"/>
                <Text style={st.textoMenu}>Plantações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={st.botao}>
                <Icon name="account-cowboy-hat" size={60} color="black"/>
                <Text style={st.textoMenu}>Perfil</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const st = StyleSheet.create({
    containerMenu:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F6C500',
        paddingHorizontal: '5%',
        paddingBottom: '10%',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30
    },
    textoMenu:{
        fontSize: 18,
        color: 'black',
        fontFamily: 'Roboto-Regular'
    },
    botao:{
        alignItems: 'center'
    },
})

export default Menu