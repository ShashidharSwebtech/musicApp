import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Foundation';
import Home from './src/components/Home';
// import {createBottomstackNavigator} from '@react-navigation/bottom-stacks';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from './src/components/Landing';
import Main from './src/components/Main';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store';
import MusicPlay from './src/components/MusicPlay';
const stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <stack.Navigator
          screenOptions={
            {
              // stackBarActiveTintColor: '#844DFB',
            }
          }>
          <stack.Screen
            name="loading"
            component={Landing}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="main"
            component={Main}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="music"
            component={MusicPlay}
            options={{headerShown: false}}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
