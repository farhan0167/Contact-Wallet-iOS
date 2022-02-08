import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

class AddCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            handle: "",
            url: ""
        }
    }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  handleSubmit = () => {
    
    const formData = {
        "handle" : this.state.handle,
        "url" : this.state.url
    }
    if (formData.handle == "" || formData.url == ""){
        Alert.alert("Oops","Please try again by entering a valid handle and URL")
        this.setModalVisible(false)
    }
    else {
        fetch("http://192.168.1.20:3000/create-card", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
        }
        )
        this.setModalVisible(false)
    }

  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}>

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                    style={styles.topBar}
                    onPress={() => this.setModalVisible(!modalVisible)}>
                    <Icon style={styles.add} name="expand-more" size={55} />
                </Pressable>

                <View style={styles.form}>
                    <Text style={styles.addCardText}>Handle/ Contact</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handle => this.setState({handle:handle})}
                        //value={text}
                    />

                    <Text style={styles.addCardURL}>URL</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={url => this.setState({url:url})}
                        //value={text}
                    />
                    <View style={styles.modaladd}>
                      <Pressable
                          onPress={this.handleSubmit}>
                          <Icon style={styles.add} name="add-circle" size={65} />
                      </Pressable>
                    </View>
                </View>
                
              </View>
            </View>
        </Modal>
        <Pressable
          onPress={() => this.setModalVisible(true)}>
          <Icon style={styles.add} name="add-circle" size={65} />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    width: "100%",
    height: '100%',
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  topBar:{
      marginBottom: 50,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  form: {
    display: "flex",
    width: "100%"
},
modaladd:{
  alignItems:"center",
  marginTop: 30

},
  input: {
    height: 40,
    margin: 1,
    borderWidth: 1,
    padding: 10,
    width:"100%"
    
  },
  addCardText:{
      textAlign: "left"
  }
});

export default AddCard;