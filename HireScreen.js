import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

export default class HireScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      userId                    : firebase.auth().currentUser.email,
      userName                  : "",
      employeeId                : this.props.navigation.getParam('details')["user_id"],
      applyId                 : this.props.navigation.getParam('details')["apply_id"],
      employeeName              : '',
      employeeContact           : '',
      employeeAddress           : '',
    }
  }

  getRecieverDetails(){
    db.collection('users').where('email_id','==',this.state.employeeId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          employeeName    : doc.data().first_name,
          employeeContact : doc.data().contact,
          employeeAddress : doc.data().address,
        })
      })
    });
    db.collection('requested_job').where('user_id','==',this.state.employeeId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({employeeRequestDocId:doc.id})
     })
  })}

  getUserDetails=(userId)=>{
    db.collection("users").where('email_id','==', userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          userName  :doc.data().first_name + " " + doc.data().last_name
        })
      })
    })
  }

  updateJobStatus=()=>{
    db.collection('all_donations').add({
      "apply_id"          : this.state.applyId,
      "requested_by"        : this.state.recieverName,
      "employee_id"            : this.state.userId,
      "request_status"      :  "Employee Interested"
    })
  }

  addNotification=()=>{
    var message = this.state.userName + " has shown interest in applying for your job"
    db.collection("all_notifications").add({
      "targeted_user_id"    : this.state.employeeId,
      "donor_id"            : this.state.userId,
      "request_id"          : this.state.applyId,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" : "unread",
      "message"             : message
    })
  }

  componentDidMount(){
    this.getRecieverDetails()
    this.getUserDetails(this.state.userId)
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Hire Screen", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Employee Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.employeeName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.employeeContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.employeeAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateJobStatus()
                    this.addNotification()
                  }}>
                <Text>I want to Work</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
container: {
  flex:1,
},
buttonContainer : {
  flex:0.3,
  justifyContent:'center',
  alignItems:'center'
},
button:{
  width:200,
  height:50,
  justifyContent:'center',
  alignItems : 'center',
  borderRadius: 10,
  backgroundColor: 'orange',
  shadowColor: "#000",
  shadowOffset: {
     width: 0,
     height: 8
   },
  elevation : 16
}
})
