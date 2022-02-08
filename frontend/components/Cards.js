import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Share, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import AddCard from './AddCard.js'

export default class Cards extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            data: []

        }
    }
    _onRefresh() {
      this.setState({refreshing: true});
      fetch("http://192.168.1.20:3000/get-cards")
        .then(res => res.json())
        .then(json=> {
            this.setState({
                data: json,
                refreshing: false
            })
        })
    }

    componentDidMount(){
        fetch("http://192.168.1.20:3000/get-cards")
        .then(res => res.json())
        .then(json=> {
            this.setState({
                data: json
            })
        })
    }
    async onShare(cardUrl){
    
        const url = cardUrl
        try {

          const result = await Share.share({
            message: url
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    render() {
        let {data} = this.state;
        return (
            <ScrollView>
            
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
                
                {data.map(d=>(
                    <TouchableOpacity className='card' key={d.id} onPress={(e)=> this.onShare(d.url,e)}>
                        <View style={styles.card}>
                            <Text style={styles.cardHeader}>{d.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <AddCard/>
            </ScrollView>          
            
        )
    }
}

const styles = StyleSheet.create({
    card:{
        
        backgroundColor: '#e8ebe6',
        height: 180,
        borderRadius: 20,
        marginTop:10
        
    },
    cardHeader:{
        margin: 25,
        fontFamily: "Helvetica",
        fontSize: 18,
        justifyContent:'center',
        alignContent: 'center',
        
        
    }
})
