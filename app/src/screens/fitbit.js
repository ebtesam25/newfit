import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { Button, Image, Text, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

export default function Fitbit(){
    const navigation = useNavigation();
    const [profile, setProfile] = React.useState({
        "user": {
            "age": 23,
            "ambassador": false,
            "avatar": "https://static0.fitbit.com/images/profile/defaultProfile_100.png",
            "avatar150": "https://static0.fitbit.com/images/profile/defaultProfile_150.png",
            "avatar640": "https://static0.fitbit.com/images/profile/defaultProfile_640.png",
            "averageDailySteps": 0,
            "challengesBeta": true,
            "clockTimeDisplayFormat": "12hour",
            "corporate": false,
            "corporateAdmin": false,
            "dateOfBirth": "1998-07-25",
            "displayName": "Ebtesam H.",
            "displayNameSetting": "name",
            "distanceUnit": "en_US",
            "encodedId": "66JB7Q",
            "features": {
                "exerciseGoal": true
            },
            "firstName": "Ebtesam",
            "fullName": "Ebtesam H",
            "gender": "FEMALE",
            "glucoseUnit": "en_US",
            "height": 200.0,
            "heightUnit": "en_US",
            "isBugReportEnabled": false,
            "isChild": false,
            "isCoach": false,
            "languageLocale": "en_US",
            "lastName": "H",
            "legalTermsAcceptRequired": true,
            "locale": "en_US",
            "memberSince": "2017-12-20",
            "mfaEnabled": true,
            "offsetFromUTCMillis": -18000000,
            "phoneNumber": "+15710000000",
            "sdkDeveloper": false,
            "sleepTracking": "Normal",
            "startDayOfWeek": "SUNDAY",
            "strideLengthRunning": 94.5,
            "strideLengthRunningType": "manual",
            "strideLengthWalking": 66.0,
            "strideLengthWalkingType": "manual",
            "swimUnit": "en_US",
            "temperatureUnit": "en_US",
            "timezone": "America/New_York",
            "topBadges": [],
            "weight": 100.0,
            "weightUnit": "METRIC"
        }
    })
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
    const [user, setUser] = React.useState('-');
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '',
      scopes: ['activity', 'sleep','profile','weight'],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        useProxy,
        scheme: 'exp://localhost:19002/--/*'
        }),
    },
    discovery
  );

  const _getActivity = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var profile = {};
    var activity = {};
    
    fetch("https://api.fitbit.com/1/user/66JB7Q/activities/date/2022-01-01.json", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result); activity=result})
      .catch(error => console.log('error', error));

    fetch("https://api.fitbit.com/1/user/66JB7Q/profile.json", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result); profile=result;})
      .catch(error => console.log('error', error));


    _rawReadings(profile, activity);
  }

  const _registerUser = (email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "action": "register",
      "name": profile.user.displayName,
      "email": email,
      "password": password,
      "age": profile.user.age,
      "gender": profile.user.gender,
      "weight": profile.user.weight,
      "height": profile.user.height,
      "phone": profile.user.phoneNumber
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



  const _rawReadings = (profile) => {
    var myHeaders = new Headers();
    console.log(profile,activity)
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "action": "addraw",
      "userid": "2",
      "ts": "1332042634",
      "steps": activity.summary.steps,
      "calories": activity.summary.caloriesOut,
      "bmr": activity.summary.caloriesBMR
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


  React.useEffect(() => {
    if (response?.type === 'success'){
        console.log(response)
      const { access_token } = response.params;
      _getActivity(access_token);
      _getProfile(access_token);
      const { user_id } = response.params;
      console.log(user_id);
      setUser(user_id);
      }
  }, [response]);

  return(
    <View style={{marginTop:'20%', paddingHorizontal:'5%'}}>
        
        <Image source={require('../assets/bg.png')} style={{width:'80%', height:'50%', resizeMode:'contain', alignSelf:'center'}}></Image>
        <Text style={{fontSize:30, fontWeight:'bold', textAlign:'center'}}>Welcome back!</Text>
        <Text style={{fontSize:15, fontWeight:'bold', textAlign:'center'}}>Finish setting up your profile</Text>

        <View style={{marginTop:'15%'}}></View>
        <View style={{marginTop:'2.5%'}}></View>
        <TouchableOpacity onPress={()=>{promptAsync({useProxy});}}><View style={{flexDirection:'row', justifyContent:'space-around', alignContent:'center', borderRadius:10, width:'60%', paddingVertical:'2.5%', alignSelf:'center', backgroundColor:'#00B0B9'}}>
        <Icon name="google-fit" type="material-community" color={theme.white} size={30}></Icon>
        <Text style={{fontWeight:'bold', textAlignVertical:'center', textAlign:'center', color:theme.white}}>Connect to Fitbit</Text>
        </View></TouchableOpacity>
        <Text onPress={()=>navigation.navigate('Home')} style={{fontWeight:'bold', color:"#AAA", textAlign:'center', marginTop:'15%'}}>Connected to Fitbit ({user})</Text>
        </View>
  );
}