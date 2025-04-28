import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Botao = (props) =>{
    
    const texto = props.texto
    const funcao = props.funcao

    return(
        <TouchableOpacity style={estilos.botao} onPress={props.funcao}>
            <Text style={estilos.texto}>{texto}</Text>
        </TouchableOpacity>
    )
}

const estilos = StyleSheet.create({

    botao: {
        backgroundColor: '#F6C500',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        borderRadius: 9,
    },
    texto: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center',  
    }


})

export default Botao