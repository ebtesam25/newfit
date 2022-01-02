import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>',
};

export default function Github() {
    const navigation = useNavigation();
    const [github, setGithub] = React.useState('');
    const [access_token, setAccessToken] = React.useState('');
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '',
      scopes: ['read:user','repo:status'],
      redirectUri: makeRedirectUri({
        scheme: 'exp://localhost:19002/--/*'
        }),
    },
    discovery
  );

  const _getAccessToken = (code) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "client_id": "",
      "client_secret": "",
      "code": code,
      "accept": "json"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://github.com/login/oauth/access_token", requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result);
        var regex = /\=(.*?)\&/;
        var strToMatch = result;
        var matched = regex.exec(strToMatch);
        setAccessToken(matched[1]);
        console.log(matched[1])
    _getUser(matched[1])})
      .catch(error => console.log('error', error));
  }

  const _getUser = (token) => {
      console.log(token)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `token ${token}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://api.github.com/user", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result.login);setGithub(result.login);_getEvents(token,result.login);})
      .catch(error => console.log('error', error));
  }

  const _getEvents = (token,user) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `token ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://api.github.com/users/${user}/events`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result.length))
    .catch(error => console.log('error', error));
  }

  React.useEffect(() => {
      if(request!=null){
      console.log(request.redirectUri)
      }
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(response)
      _getAccessToken(code);
      }
  }, [response]);

  return (
    <View style={{marginTop:'20%', paddingHorizontal:'5%'}}>
        
        <Image source={require('../assets/bg.png')} style={{width:'80%', height:'50%', resizeMode:'contain', alignSelf:'center'}}></Image>
        <Text style={{fontSize:30, fontWeight:'bold', textAlign:'center'}}>Welcome back!</Text>
        <Text style={{fontSize:15, fontWeight:'bold', textAlign:'center'}}>Finish setting up your profile</Text>

        <View style={{marginTop:'15%'}}></View>
        <TouchableOpacity onPress={()=>{promptAsync();}}><View style={{flexDirection:'row', justifyContent:'space-around', alignContent:'center', borderRadius:10, width:'60%', paddingVertical:'2.5%', alignSelf:'center', backgroundColor:'#222'}}>
        <Icon name="github" type="font-awesome" color={theme.white} size={30}></Icon>
        <Text style={{fontWeight:'bold', textAlignVertical:'center', textAlign:'center', color:theme.white}}>1. Connect to Github</Text>
        </View></TouchableOpacity>
        <View style={{marginTop:'2.5%'}}></View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Fitbit')}}><View style={{flexDirection:'row', justifyContent:'space-around', alignContent:'center', borderRadius:10, width:'60%', paddingVertical:'2.5%', alignSelf:'center', backgroundColor:'#00B0B9'}}>
        <Icon name="google-fit" type="material-community" color={theme.white} size={30}></Icon>
        <Text style={{fontWeight:'bold', textAlignVertical:'center', textAlign:'center', color:theme.white}}>2. Connect to Fitbit</Text>
        </View></TouchableOpacity>
        <Text style={{fontWeight:'bold', color:"#AAA", textAlign:'center', marginTop:'15%'}}>Connected to Github ({github})</Text>
    </View>
  );
}