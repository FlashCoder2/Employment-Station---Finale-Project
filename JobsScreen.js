import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config'

export default class JobsScreen extends Component{
    constructor(){
        super();
        this.state ={
          AllJobs:[]
        }
      }

      retrieveSJobs=()=>{
        try {
          var AllJobs= []
          var Jobs = db.collection("jobs")
            .get().then((querySnapshot)=> {
              querySnapshot.forEach((doc)=> {
                  
                  AllJobs.push(doc.data())
                  console.log('these are the jobs current available',AllJobs)
              })
              this.setState({AllJobs})
            })
        }
        catch (error) {
          console.log(error);
        }
      };

      render(){
        return(
            <View>
                 <FlatList
                    data={this.state.AllJobs}
                    renderItem={({ item }) => (
                      <View style={styles.itemContainer}>
                        <Text>Job: {item.job}</Text>
                    <Text>Wage : {item.wage}</Text>
                    <Text>Employer : {item.employer}</Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  SearchContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});