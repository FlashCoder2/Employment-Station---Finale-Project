import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,
    KeyboardAvoidingView,ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Header} from 'react-native-elements';
import db from '../config'

export default class AddWorkScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            wage: '',
            job: '',
            explanation: '',
        }
    }

    submitStory = ()=>{
        db.collection("jobs").add({
            wage: this.state.wage,
            job: this.state.job,
            explanation: this.state.explanation,
        })
        this.setState({
            wage: '',
            job: '',
            explanation: ''
        })
        ToastAndroid.show('Your job has been successfully added to the Available Jobs List'
        , ToastAndroid.SHORT)
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container}
             behavior="padding" enabled>
               <Header 
                    backgroundColor = {'white'}
                     centerComponent = {{
                        text : 'Employ Screen',
                        style : { color: 'black', fontSize: 30}
                    }}
                />
                <TextInput 
                    placeholder="Job"
                    onChangeText= {(job)=>{
                        this.setState({
                            job: text
                        })
                    }}
                    placeholderTextColor='black'
                    value={this.state.job}
                    style={styles.job}/>
                <TextInput
                    placeholder="Wage"
                    type="money"
                    onChangeText= {(wage)=>{
                        this.setState({
                            wage: text
                        })
                    }}
                    placeholderTextColor='black'
                    value={this.state.wage}
                    style={styles.wage} />
                <TextInput 
                    placeholder="Explain the Task at Hand"
                    onChangeText= {(explanation)=>{
                        this.setState({
                            explanation: text
                        })
                    }}
                    placeholderTextColor='black'
                    value={this.state.explanation}
                    style={styles.explanation}
                    multiline={true}/>
                
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.submitJob}
                    >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  job:{
      height: 40,
      borderWidth: 2,
      marginTop: 40,
      margin: 10,
      color:'black',
      padding: 6,

  },
  wage: {
      height: 40,
      borderWidth: 2,
      margin: 10,
       padding: 6,
  },
  explanation: {
      height: 250,
      borderWidth: 2,
      margin: 10, 
      padding: 6,
      textAlignVertical: "top"
  },
  submitButton:{
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: 'pink',
      width: 80,
      height: 40,color:'black',
  },
  buttonText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      color:'black',
  }
});