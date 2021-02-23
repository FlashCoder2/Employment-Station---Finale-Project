import React from 'react'
import { Stylesheet, View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import SettingsScreen from '../Screens/SettingsScreen.js'
import NotificationsScreen from '../Screens/NotificationScreen.js'
import AddWorkScreen from '../Screens/AddWorkScreen.js'
import HireScreen from '../Screens/HireScreen.js'

export default class App extends React.Component {
     render(){
         return (

             <AppContainer />
             
         );
     }
}

const TabNavigator = createBottomTabNavigator({
    Settings : {screens: SettingsScreen},
    Notifications : {screens: NotificationsScreen},
    Applications : {screens: HireScreen},
    AddJobs : {screens: AddWorkScreen}
});

const AppContainer = createAppContainer(TabNavigator);