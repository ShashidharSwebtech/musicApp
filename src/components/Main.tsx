// import {Text, View} from 'react-native';
import React, {Component} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Foundation';
import Home from './Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconoIcon from 'react-native-vector-icons/Ionicons';
import FertherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from './Search';
import Feed from './Feed';
import PlayList from './PlayList';
import {responsiveWidth} from 'react-native-responsive-dimensions';
const Tab = createBottomTabNavigator();

export class Main extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#844DFB',
          tabBarStyle: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: '#1D103A',
            overflow: 'hidden',
            backfaceVisibility: 'hidden',
            borderColor: '#000',
            borderLeftColor: '#000',
            position: 'absolute',
            bottom: 0,
            width: responsiveWidth(100),
          },
        }}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({color}) => (
              <Icons name="home" size={30} color={color} />
            ),
            headerShown: false,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="search"
          component={Search}
          options={{
            tabBarIcon: ({color}) => (
              <IconoIcon name="search-sharp" size={30} color={color} />
            ),
            headerShown: false,
            tabBarLabel: 'Search',
          }}
        />
        <Tab.Screen
          name="feed"
          component={Feed}
          options={{
            tabBarIcon: ({color}) => (
              <FertherIcon name="users" size={30} color={color} />
            ),
            headerShown: false,
            tabBarLabel: 'Feed',
          }}
        />
        <Tab.Screen
          name="playlist"
          component={PlayList}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcon
                name="music-box-multiple-outline"
                size={30}
                color={color}
              />
            ),
            headerShown: false,
            tabBarLabel: 'Playlist',
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default Main;
