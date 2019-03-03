import React from 'react';
import {Text, Alert, Navigator,Button,ImageBackground, TextInput, View, StyleSheet,Image,KeyboardAvoidingView,StatusBar,SafeAreaView,TouchableOpacity } from 'react-native';
import { GiftedChat,Day,InputToolbar,Bubble } from 'react-native-gifted-chat';
import { createStackNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <MyNavigator />;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

class ScreenComponentOne extends React.Component {
  static navigationOptions = {
     headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
    headerTitle:'WELCOME TO DALMIA',
    
  };
constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
     return (
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Image 
          source={require('./download.png')}
         
          style={{}}
          >
          </Image>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username or Mail-ID'}
          underlineColorAndroid="transparent"
          placeholderTextColor='black'
          keyboardType='email-address'
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
           placeholderTextColor='black'
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          style={styles.input}
        />
        <View style={styles.btnContainer}  >
        <Button 
          style={styles.userBtn}
          title={'Login'}
          //style={styles.input1}
          onPress={() => this.props.navigation.navigate('RouteNameTwo')}
        />
        <Button  
        style={styles.userBtn}
          title={'Signup'}
         //style={styles.input1}
          onPress={() => this.props.navigation.navigate('RouteNameThree')}
        />
        </View>
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={300}/>
      </View>
      </SafeAreaView>
    )
  }
}

class ScreenComponentTwo extends React.Component {
  static navigationOptions = {
     headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
    headerTitle:'Chattee',
     headerRight: (<View />),
    headerStyle: {
      backgroundColor: '#0153A5',
    },
    headerTintColor: '#fff',
  };
state = {
    messages: [],
    watsoninput:{
      input:"",
      messageContext: {
        global: {
          system: {
            turn_count: 1
          }
        },
        skills: {
          "main skill": {
            user_defined: {}
          }
        }
      },
    },


  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello,I am chattee! How can I help you?',
          
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Watson Assistant',
            avatar: 'http://companies.naukri.com/dalmiabharat-jobs/wp-content/uploads/sites/2426/2015/04/product.jpg', 
          },
        },
      ],
     
  
    }
   
  )
  }

  onSend(messages = []) {
    console.log("messages "+ messages);
    var watsonInput = {};
    this.setState(previousState => {
      watsonInput = previousState.watsoninput;
      watsonInput.input = messages[0].text;
      this.setState({
      messages: GiftedChat.append(previousState.messages, messages),
      watsoninput:watsonInput
    });
    
     this.connectWatson(messages, watsonInput);
    }
    );

   
  }

  

 connectWatson(messages, watsonInput) {
    console.log(messages[0]);
    console.log("input :" +JSON.stringify(
      watsonInput
    ));
    fetch("https://us-south.functions.cloud.ibm.com/api/v1/web/Paz%20Org_dev/default/inventoryapi.json?cache-bust=" + Date.now(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      watsonInput
      
    ),
  }).then((response) => (response.json()))
      .then((responseJson) => {
       
        console.log(  responseJson);
        var watsonresponse = responseJson.response;
        var sessionId = responseJson.sessionId;
        var messageContext = responseJson.messageContext;

       
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, {
              _id: Math.round(Math.random() * 1000000),
              text: watsonresponse,
              createdAt: new Date(),
              user:{
                _id:2,
                name:"Watson Assistant",
                avatar: 'http://companies.naukri.com/dalmiabharat-jobs/wp-content/uploads/sites/2426/2015/04/product.jpg'
              },
            }),
            watsoninput:{
              input:"",
              sessionId:sessionId,
              messageContext:messageContext

            }
          }
      })
      

      })

 }
  renderDay1(props) {
    return (<Day {...this.props} textStyle={{color: 'black'}}/>
    )}
 renderInputToolbar (props) {
     //Add the extra styles via containerStyle
    return <InputToolbar {...props} containerStyle={{}} />
  }renderBubble (props) {
    return (
      <Bubble
        {...props}
          wrapperStyle={{
            left: {
              backgroundColor: "white",
            
            },
            right: {
              backgroundColor: "#0153A5",
              
            }
          }}
          textStyle={{
            right: {
              color: "white",
            },
            left: {
              color: "black",
            }
          }}
      />
    )
  }
  
  render() {
    return (
      <ImageBackground source={require('./kan1.png')}
      style={styles.container}>
      <View style={{flex:6,width:366,}}>
        <View  style={{flex:1,}}>
      <GiftedChat
       listViewProps={ { contentContainerStyle: {'flexGrow': 1, 'justifyContent': 'flex-end', } } }
        messages={this.state.messages}
         onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble}
         renderInputToolbar={this.renderInputToolbar}
         
         // textInputProps={{autoFocus: true,color: 'white'}}
         //textProps={{ style: { color: 'red' } }}
         renderDay1={this.renderDay1}
        user={{
          _id: 1,
        }}
        //renderDay={this.renderDay}
      />
       <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80}/>
        </View>
      </View>
      </ImageBackground>
    );
  }
}

class ScreenComponentThree extends React.Component {
  static navigationOptions = {
     headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
    headerTitle:'WELCOME TO SIGNUP PAGE',
    
  };
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ')
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
 
  render() {
    return (
      
      <View style={styles.scontainer}>
        <TextInput
          style={styles.sinput}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.sinput}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
         placeholderTextColor='black'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.sinput}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='black'
          keyboardType='email-address'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.sinput}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={200}/>
        <Button
          title='Sign Up'
         onPress={() => this.props.navigation.navigate('RouteNameOne')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
    alignItems: 'center'
  },
   input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    color : "black",

  },
  sinput: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    color : "black",

  },
  userBtn:{
    padding:15,
    width:100,
    textAlign:'center',
    alignItems: 'center',
  },
  btnContainer:{
    flexDirection:'row', 
    justifyContent:'space-between',
    width:200,
  },
});
const MyNavigator = createStackNavigator(
  {
    RouteNameOne: ScreenComponentOne,
    RouteNameTwo: ScreenComponentTwo,
    RouteNameThree: ScreenComponentThree,
  },
  {
    // headerTransitionPreset: 'uikit',
    // mode: 'modal',
  }
);
