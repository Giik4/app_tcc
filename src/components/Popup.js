import React from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Popup = ({modalVisible, setModalVisible, onConfirm, text}) => {
  const navigation = useNavigation();

  const botaoSim = () => {
    if (onConfirm) {
      onConfirm(); //executa a exclusão da pesquisa
    }
    setModalVisible(false);
  };

  const botaoNao = () => {
    setModalVisible(false); //fecha o modal
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Tem certeza que deseja excluir {text} ?
          </Text>

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.buttonSim} onPress={botaoSim}>
              <Text style={styles.buttonText}>SIM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCancelar} onPress={botaoNao}>
              <Text style={styles.buttonText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2B1F5C',
    padding: 20,
    borderRadius: 2,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: '40%',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  buttonSim: {
    backgroundColor: '#FF8383',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 1,
    marginRight: 20,
    width: '80%',
    height: '100%',
  },
  buttonCancelar: {
    backgroundColor: '#3F92C5',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 1,
    width: '80%',
    height: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
});

export default Popup;
