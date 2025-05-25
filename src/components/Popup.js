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
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCancelar} onPress={botaoNao}>
              <Text style={styles.buttonText}>Cancelar</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    justifyContent: 'center',
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
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 1,
    width: '80%',
    height: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
});

export default Popup;
