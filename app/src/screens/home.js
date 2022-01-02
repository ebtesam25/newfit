
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, ThemeContext } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { theme } from '../theme';





export default function Home() {
    const navigation = useNavigation();
    const [data, setData] = useState({"status": "success", "readings": [{"steps": "10000", "ts": "1332042634", "calories": "100", "bmr": "1500"}], "gits":
    [{"actions": "30", "ts": "1332042634"}], "nfts": [{"steps": "1000", "ts": 174250898, "calories": "1300", "name":
    "ebtesam", "git": "20", "image": "bafybeieprkda4wgpvhblzzvit5wl5wbmvdpjrj6f2e566htkhfhbjacicm.ipfs.dweb.link"}]});
    const [activity, setActivity] = React.useState({
        "activities": [],
        "goals": {
            "activeMinutes": 30,
            "caloriesOut": 2444,
            "distance": 8.05,
            "steps": 10000
        },
        "summary": {
            "activeScore": -1,
            "activityCalories": 0,
            "caloriesBMR": 1477,
            "caloriesOut": 1477,
            "distances": [
                {
                    "activity": "total",
                    "distance": 0
                },
                {
                    "activity": "tracker",
                    "distance": 0
                },
                {
                    "activity": "loggedActivities",
                    "distance": 0
                },
                {
                    "activity": "veryActive",
                    "distance": 0
                },
                {
                    "activity": "moderatelyActive",
                    "distance": 0
                },
                {
                    "activity": "lightlyActive",
                    "distance": 0
                },
                {
                    "activity": "sedentaryActive",
                    "distance": 0
                }
            ],
            "fairlyActiveMinutes": 0,
            "lightlyActiveMinutes": 0,
            "marginalCalories": 0,
            "sedentaryMinutes": 1440,
            "steps": 0,
            "veryActiveMinutes": 0
        }
    })

    const [git, setGit] = useState('20');

    const _generateNFT = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": "ebtesam",
        "userid": "2",
        "git": git,
        "steps": activity.summary.steps,
        "calories": activity.summary.caloriesOut,
        "targetsteps": activity.goals.steps,
        "targetcals": activity.goals.caloriesOut,
        "targetgit": "40",
        "ts": 174250898
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://532b-173-251-116-226.ngrok.io/NFTize", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

const _mintNFT = (uri) => {

        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "action": "addnfts",
  "name": "ebtesam",
  "userid": "2",
  "git": git,
  "steps": activity.summary.steps,
  "calories": activity.summary.caloriesOut,
  "targetsteps": activity.goals.steps,
  "image": uri,
  "ts": Date.now()
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/newfit", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

    }


    return (
        <View style={styles.container}>
            <View style={{backgroundColor:"#000", borderRadius:20, padding:'5%'}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Icon name="github" type="ant-design" color="#FFF" size={30}></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:25, textAlignVertical:'center', marginLeft:'2.5%'}}>Github</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%'}}>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Handle</Text>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Activity/Goal</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>@ebtesam25</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>{data.gits[0].actions}/50</Text>
            </View>
            </View>

            <View style={{marginTop:'5%'}}></View>

            <View style={{backgroundColor:"#00B0B9", borderRadius:20, padding:'5%'}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Icon name="google-fit" type="material-community" color="#FFF" size={30}></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:25, textAlignVertical:'center', marginLeft:'2.5%'}}>Fitbit</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%'}}>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Parameters</Text>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Achieved/Goal</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Steps</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>{data.readings[0].steps}/120000</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Calories</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>{data.readings[0].calories}/1500</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Active</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>30/120</Text>
            </View>
            <Text style={{fontWeight:'bold', color:"#FFF", fontSize:12, textAlign:'center', marginTop:'15%'}}>*BMR={data.readings[0].bmr}</Text>
            </View>

            <View style={{marginTop:'5%'}}></View>


            <View style={{backgroundColor:"#000", borderRadius:20, padding:'5%'}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Icon name="md-heart-circle" type="ionicon" color="#FFF" size={30}></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:25, textAlignVertical:'center', marginLeft:'2.5%'}}>NFTs</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%'}}>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Git</Text>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Steps</Text>
                <Text style={{ color:"#FFF", fontSize:13, textAlign:'center'}}>Calories</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'1.5%'}}>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>20/40</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>600/1000</Text>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>500/10000</Text>
            </View>
            <Image source={{uri:'http://bafybeieprkda4wgpvhblzzvit5wl5wbmvdpjrj6f2e566htkhfhbjacicm.ipfs.dweb.link'}} style={{width:200, height:100, resizeMode:'contain', alignSelf:'center', borderRadius:10}}></Image>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <TouchableOpacity onPress={()=>_generateNFT()}><View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:"#000", borderRadius:10, padding:'2.5%', width:'65%', marginVertical:'5%', alignSelf:'center'}}>
                <Icon name="md-add-circle-sharp" type="ionicon" color="#FFF"></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Generate NFT</Text>
            </View></TouchableOpacity>
            <TouchableOpacity onPress={()=>_mintNFT()}><View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:"#000", borderRadius:10, padding:'2.5%', width:'65%', marginVertical:'5%', alignSelf:'center'}}>
                <Icon name="heart-circle-sharp" type="ionicon" color="#FFF"></Icon>
                <Text style={{fontWeight:'bold', color:"#FFF", fontSize:15, textAlign:'center'}}>Mint NFT</Text>
            </View></TouchableOpacity>
            </View>

            
            
            <View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:"#000", borderRadius:20, padding:'3.5%'}}>
                <Icon name="home" type="ionicon" color="#FFF"></Icon>
                <Icon name="users" type="font-awesome-5" color="#666"></Icon>
                <Icon name="user-tag" type="font-awesome-5" color="#666"></Icon>
            </View>
            


        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: theme.white,
        paddingHorizontal: '7.5%',
        paddingVertical: '10%'
    },
    header: {
        height: '55%',
        width: '100%',
        marginTop: '-5%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});