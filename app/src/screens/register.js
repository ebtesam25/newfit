import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';





export default function Register({route}) {
    const navigation = useNavigation();
    
    const {type} = route.params;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    function goToLocation(){
      
        navigation.navigate('github');

    }
    return (
        <View style={styles.container}>
            <View style={{ marginTop: '15%'}}>
              <View style={{flexDirection:'row', display:'flex', marginHorizontal:'10%'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('LoginChoice')}><Icon name="chevron-left" type="entypo" color="#0095ff" size={35}></Icon></TouchableOpacity>
              </View>
              <View style={{position:'relative', marginLeft:'10%', marginTop:'40%'}}>
                <Text style={{ fontSize:30, color:'#292c2e', fontWeight:'bold'}}>Sign Up As A {type}</Text>
                <Text style={{ fontSize:12, color:'#d1d1d1'}}>Start your rescue now</Text>
                <TextInput value={name} onChangeText={setName} style={{backgroundColor:'#FFF',fontWeight:'bold', borderRadius:10, width:'90%', height:50, marginTop:'10%', paddingLeft:'5%'}} placeholder="Full Name" placeholderTextColor="#0553B9"></TextInput>
                <TextInput value={email} onChangeText={setEmail} style={{backgroundColor:'#FFF',fontWeight:'bold', borderRadius:10, width:'90%', height:50, marginTop:'5%', paddingLeft:'5%'}} placeholder="Email address" placeholderTextColor="#0553B9"></TextInput>
                <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{backgroundColor:"#FFF", fontWeight:'bold',borderRadius:10, width:'90%', height:50, marginTop:'5%', paddingLeft:'5%'}} placeholder="Password" placeholderTextColor="#0553B9"></TextInput>
              </View>
              <View style={{backgroundColor:'#0095ff', marginTop:'10%', width:'90%', alignSelf:'center', paddingHorizontal:'5%', paddingVertical:'5%', borderRadius:15}}>
                  <TouchableOpacity onPress={()=> goToLocation()}><Text style={{textAlign:'center', color:'#FFF',  fontSize:18, fontWeight:'bold'}}>Sign Up</Text></TouchableOpacity>
              </View>
              <View style = {styles.rowStyle}>
                <View style = {{width:"60%"}}>
                  <View style={{borderRadius:10, paddingVertical:'5%'}}>
                    <Text style={{textAlign:'center', color:'#a6b3bd',  fontSize:15, textDecorationColor:'#FBDE44', textDecorationStyle:'double'}}>Already have an account? </Text>
                  </View>
                </View>
                <View style = {{width:"40%"}}>
                  <View style={{backgroundColor:'#b3bdc4', width:'80%', alignSelf:'center', paddingHorizontal:'5%', paddingVertical:'5%', borderRadius:15}}>
                      <TouchableOpacity onPress={()=>navigation.navigate('Login',{type:type})}><Text style={{textAlign:'center', color:'#292c2e',  fontSize:18, fontWeight:'bold'}}>Login</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: '#EDF2F6'
    },
    searchSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    rowStyle: {
      flex: 1,
      flexDirection: 'row',
      marginTop:'10%',
      flexWrap: 'wrap',
      alignItems: 'flex-start' // if you want to fill rows left to right
    },
    header: {
        height:'34%',
        width:'34%',
        resizeMode:'contain',
        marginLeft:'10%'
    },

});